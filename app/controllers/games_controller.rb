class GamesController < ApplicationController
  def index
  end

  def print_receipt
    address = params[:address]
    tx_hash = params[:tx_hash]
    balance = params[:balance]

    receipt_content = "Wallet Address: #{address}\nTransaction Hash: #{tx_hash}\nBalance: #{balance}"

    begin
      print_to_printer(receipt_content)
      render json: { status: 'success' }
    rescue => e
      render json: { status: 'error', message: e.message }
    end
  end

  private

  def print_to_printer(content)
    File.open("/tmp/receipt.txt", "w") { |file| file.write(content) }
    system("blueutil --connect 04:7f:0e:1d:23:ef")
    system("sudo stty -f /dev/cu.58HB6 9600")
    system("cat /tmp/receipt.txt > /dev/cu.58HB6")
  end
end
