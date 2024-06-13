# Pin npm packages by running ./bin/importmap

pin "application"
pin "bootstrap", to: "bootstrap.min.js", preload: true
pin "qrcode", to: "https://cdn.jsdelivr.net/npm/qrcode/build/qrcode.min.js"
pin "@popperjs/core", to: "https://ga.jspm.io/npm:@popperjs/core@2.11.6/lib/index.js"
pin "ethers", to: "https://cdnjs.cloudflare.com/ajax/libs/ethers/5.7.0/ethers.esm.min.js"
pin "escpos", to: "https://cdn.jsdelivr.net/npm/escpos@3.0.0-alpha.6/index.min.js"
pin "escpos-bluetooth", to: "https://cdn.jsdelivr.net/npm/escpos-bluetooth@3.0.0-alpha.2/index.min.js"