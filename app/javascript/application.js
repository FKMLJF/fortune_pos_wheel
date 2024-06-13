// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "bootstrap"
import "@popperjs/core"
import * as escpos from "escpos"
import * as escposbluetooth from "escpos-bluetooth"

import { ethers } from "ethers";


document.addEventListener("DOMContentLoaded", async function() {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const sections = 32;
    const sectionAngle = (2 * Math.PI) / sections;
    const winSections = [0, 4, 8, 12, 16, 21, 27, 29, 31];

    const prizes = Array(sections).fill("LOSE");
    winSections.forEach(index => prizes[index] = "WIN");

    if (!localStorage.getItem("walletAddress") || !localStorage.getItem("privateKey")) {
        const wallet = ethers.Wallet.createRandom();
        localStorage.setItem("walletAddress", wallet.address);
        localStorage.setItem("privateKey", wallet.privateKey);
    }

    const userWalletAddress = localStorage.getItem("walletAddress");
    const userPrivateKey = localStorage.getItem("privateKey");
    document.getElementById("walletAddress").value = userWalletAddress;
    document.getElementById("privateKey").value = userPrivateKey;

    async function updateBalance() {
        try {
            printReceipt("2", "2", "2");
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contractAddress = "0x5dCb8a978fB53952d7e8b5FeE8d8567A81C92186"; // ONEMINORDER contract address
            const abi = [
                "function balanceOf(address account) view returns (uint256)"
            ];
            const contract = new ethers.Contract(contractAddress, abi, provider);
            const balance = await contract.balanceOf(userWalletAddress);
            const balanceInTokens = ethers.utils.formatUnits(balance, 18);
            document.getElementById("balance").value = `${balanceInTokens} ONEMINORDER`;
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }

    updateBalance();

    function drawWheel() {
        for (let i = 0; i < sections; i++) {
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, centerX, i * sectionAngle, (i + 1) * sectionAngle);
            ctx.fillStyle = (i % 2 === 0) ? "#f00" : "#fff";
            ctx.fill();
            ctx.stroke();

            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate((i + 0.5) * sectionAngle);
            ctx.textAlign = "right";
            ctx.fillStyle = "#000";
            ctx.font = "bold 20px sans-serif";
            ctx.fillText(prizes[i], centerX - 10, 10);
            ctx.restore();
        }
    }

    async function spinWheel() {
        const randomIndex = Math.floor(Math.random() * sections);
        const spinAngle = randomIndex * sectionAngle + (2 * Math.PI * 10);
        let currentAngle = 0;

        function animateSpin() {
            currentAngle += (spinAngle - currentAngle) * 0.1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(currentAngle);
            ctx.translate(-centerX, -centerY);
            drawWheel();
            ctx.restore();

            if (Math.abs(spinAngle - currentAngle) < 0.01) {
                currentAngle = spinAngle;
                const resultIndex = Math.floor(currentAngle / sectionAngle) % sections;
                alert(prizes[resultIndex]);
                if (prizes[resultIndex] === "WIN") {
                    sendTokens();
                }
            } else {
                requestAnimationFrame(animateSpin);
            }
        }

        animateSpin();
    }

    async function sendTokens() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const recipient = userWalletAddress;
            const amount = ethers.utils.parseUnits("10", 18); // 10 tokens
            const contractAddress = "0x5dCb8a978fB53952d7e8b5FeE8d8567A81C92186"; // ONEMINORDER contract address
            const abi = [
                "function transfer(address to, uint amount) public returns (bool)"
            ];

            const senderPrivateKey = "";
            const wallet = new ethers.Wallet(senderPrivateKey, provider);
            const contract = new ethers.Contract(contractAddress, abi, wallet);

            const tx = await contract.transfer(recipient, amount);
            console.log("Transaction hash:", tx.hash);
            await tx.wait();
            console.log("Transaction confirmed");

            updateBalance();

            // Print receipt
            printReceipt(userWalletAddress, tx.hash, amount);

        } catch (error) {
            console.error("Error sending tokens:", error);
        }
    }

    function printReceipt(address, txHash, balance) {
            const receiptContent = `
                Wallet Address: ${address}
                Transaction Hash: ${txHash}
                Balance: ${balance}
            `;

        const channel = 1;



            const device = new escposbluetooth.Bluetooth('04-7f-0e-1d-23-ef');
            const printer = new escpos.Printer(device);

            device.open((error) => {
                if (error) {
                    console.error("Failed to connect to Bluetooth printer:", error);
                    return;
                }

                printer
                    .font('A')
                    .align('CT')
                    .style('B')
                    .size(1, 1)
                    .text("Receipt")
                    .text(`Wallet Address: ${address}`)
                    .text(`Transaction Hash: ${txHash}`)
                    .text(`Balance: ${balance}`);

        });
    }

    drawWheel();

    document.getElementById("spinButton").addEventListener("click", spinWheel);
});
