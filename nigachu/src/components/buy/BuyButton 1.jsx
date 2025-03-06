import { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import address from "../../credentials/address";

const BuyButton = () => {
  const { publicKey, connect, wallet, sendTransaction, connected, select } =
    useWallet();
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false); // State to track payment success

  // Define pricing information
  const presalePrice = 0.00485;
  const launchPrice = 0.01;

  // Define the recipient address (your wallet address for receiving payments)
  const recipientAddress = address;

  // Solana connection setup
  const connection = new Connection(
    "https://api.mainnet-beta.solana.com",
    "confirmed"
  );

  // Automatically select Phantom wallet if available
  useEffect(() => {
    if (!window.solana?.isPhantom) {
      alert("Phantom Wallet is not installed. Please install it first.");
      return;
    }

    if (!wallet && window.solana?.isPhantom) {
      // Automatically select Phantom wallet if available
      select("Phantom");
    }
  }, [wallet, select]);

  const handleBuy = async () => {
    try {
      if (!wallet) {
        alert(
          "No wallet adapter found. Please ensure you have a wallet installed."
        );
        return;
      }

      if (!connected) {
        await connect(); // Trigger the wallet modal
        return;
      }

      if (!publicKey) {
        alert("Failed to connect wallet. Please try again.");
        return;
      }

      // Open the popup for payment
      setIsPopupOpen(true);
    } catch (error) {
      console.error("Error connecting wallet or handling transaction:", error);
      alert("Failed to connect wallet or execute transaction.");
    }
  };
  const handlePayment = async (amount) => {
    try {
      // Convert price to Lamports (smallest unit of SOL)
      const amountInLamports = amount * 1e9; // 1 SOL = 10^9 Lamports

      // Create a new transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey, // The user's public key
          toPubkey: new PublicKey(recipientAddress), // Your wallet address
          lamports: amountInLamports, // Payment amount in Lamports
        })
      );

      // Send the transaction
      const signature = await sendTransaction(transaction, connection);

      // Confirm the transaction
      const confirmation = await connection.confirmTransaction(
        signature,
        "confirmed"
      );

      if (confirmation.value.err) {
        throw new Error("Transaction failed");
      }

      // If payment is successful
      setIsPaymentSuccessful(true);
      alert("Payment Successful! Thank you for your purchase.");
      setIsPopupOpen(false); // Close the popup
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    }
  };

  const handleInstall = () => {
    window.open("https://phantom.app/", "_blank");
  };

  const isPhantomInstalled = !!window?.solana?.isPhantom;

  return (
    <div className="flex justify-center items-center w-full">
      <div
        onClick={
          !isPhantomInstalled
            ? handleInstall
            : publicKey
            ? handleBuy
            : async () => {
                try {
                  await connect();
                } catch (error) {
                  console.error("Failed to connect wallet", error);
                  alert("Failed to connect wallet. Please try again.");
                }
              }
        }
        className="mx-auto p-2 m-3 flex justify-center items-center gap-2 border border-[#ec5c5b] cursor-pointer sm:h-[46.51px] sm:w-[283.65px] w-1/2"
        style={{
          backgroundImage:
            "radial-gradient(circle at left, #9a2929 0%, black 70%)",
        }}
      >
        <div className="sm:w-[32.71px] h-7">
          <img
            src="melon-left.png"
            alt="melon-left"
            className="h-full w-full"
          />
        </div>

        {/* <div className="sm:w-[64.76px] w-1/2 sm:h-[36.48px]">
          <img
            src="buy-btn-text.png"
            alt="buy-btn-text"
            className="h-full w-full"
          />
        </div> */}

        <div
          className="text-red-500 text-5xl whitespace-nowrap"
          style={{
            textShadow:
              "1px 0px 2px rgba(255, 255, 255, 0.5), 2px 0px 4px rgba(0, 255, 0, .6)",
          }}
        >
          {!isPhantomInstalled
            ? "Install Wallet"
            : publicKey
            ? "BuY"
            : "Connect Wallet"}
        </div>
        <div className="sm:w-[32.71px] h-7">
          <img
            src="melon-right.png"
            alt="melon-right"
            className="h-full w-full"
          />
        </div>
      </div>

      {/* Payment Popup */}
      {isPopupOpen && (
        <div className="payment-popup fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <div className="mb-4">
              <p className="text-xl font-semibold">
                Presale Price: 0.00485 SOL
              </p>
              <p className="text-xl font-semibold">Launch Price: 0.01 SOL</p>
            </div>
            <div className="flex justify-between mb-4">
              <button
                onClick={() => handlePayment(presalePrice)}
                className="bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Pay Presale (0.00485 SOL)
              </button>
              <button
                onClick={() => handlePayment(launchPrice)}
                className="bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Pay Launch (0.01 SOL)
              </button>
            </div>

            {isPaymentSuccessful && (
              <div className="text-center text-green-600 font-semibold mt-4">
                Payment Successful!
              </div>
            )}
            <button
              onClick={() => setIsPopupOpen(false)}
              className="bg-red-700 text-white px-4 py-2 rounded-lg mt-4 block w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyButton;
