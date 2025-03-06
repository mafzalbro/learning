import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import address from "../../credentials/address";
import nighachu_address from "../../credentials/nighachu_address";
import QUICKNODE_RPC from "../../credentials/quicknode_rpc";
import { Buffer } from "buffer";
window.Buffer = Buffer;

// eslint-disable-next-line react/prop-types
const BuyButton = ({ solAmount, nigachuValue }) => {
  const { publicKey, connect, wallet, sendTransaction, connected, select } =
    useWallet();
  const [loading, setLoading] = useState(false);

  const quickNodeRPC = QUICKNODE_RPC;
  const recipientAddress = new PublicKey(address);
  const connection = new Connection(quickNodeRPC, "confirmed");
  const nigachuMintAddress = new PublicKey(nighachu_address);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getLatestBlockhash = async () => {
    const { blockhash } = await connection.getLatestBlockhash();
    console.log({ blockhash });
  };
  // Fetch the current SOL price
  useEffect(() => {
    getLatestBlockhash();
  }, [getLatestBlockhash]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!wallet) {
        alert(
          "No wallet adapter found. Please ensure you have a wallet installed."
        );
        return;
      }

      if (!connected) {
        await connect();
        return;
      }

      if (!publicKey) {
        alert("Failed to connect wallet. Please try again.");
        return;
      }

      if (!solAmount || solAmount <= 0) {
        alert("Invalid SOL amount. Please enter a valid amount.");
        return;
      }

      // Convert SOL amount to Lamports
      const amountInLamports = solAmount * 1e9;

      // Create the transaction to transfer SOL
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientAddress,
          lamports: amountInLamports,
        })
      );

      // Send the SOL transaction
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");

      // Transfer Nigachu tokens to the user
      await transferNigachuTokens(publicKey, nigachuValue);
      alert("Payment Successful! Nigachu Tokens Sent.");
    } catch (error) {
      console.error("Payment failed", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const transferNigachuTokens = async (userPublicKey, nigachuValue) => {
    try {
      const userTokenAccount = await getAssociatedTokenAddress(
        nigachuMintAddress,
        userPublicKey
      );

      const accountInfo = await connection.getAccountInfo(userTokenAccount);
      const transaction = new Transaction();

      if (!accountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            publicKey,
            userTokenAccount,
            userPublicKey,
            nigachuMintAddress
          )
        );
      }

      const nigachuAmount = parseFloat(nigachuValue) * 1e6; // Adjust decimals for your token
      transaction.add(
        createTransferInstruction(
          await getAssociatedTokenAddress(nigachuMintAddress, publicKey),
          userTokenAccount,
          publicKey,
          nigachuAmount
        )
      );

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, "confirmed");
    } catch (error) {
      console.error("Failed to transfer Nigachu tokens", error);
      throw error;
    }
  };

  const isPhantomInstalled = !!window?.solana?.isPhantom;

  // Automatically select Phantom wallet if available
  useEffect(() => {
    if (!isPhantomInstalled) {
      alert("Phantom Wallet is not installed. Please install it first.");
      return;
    }

    if (!wallet && isPhantomInstalled) {
      select("Phantom");
    }
  }, [wallet, select, isPhantomInstalled]);
  const handleInstall = () => {
    window.open("https://phantom.app/", "_blank");
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* {solPrice ? (
        <p>Current SOL Price: ${solPrice.toFixed(2)} USD</p>
      ) : (
        <p>Loading SOL Price...</p>
      )}
      <p>
        Nigachu Equivalent: {nigachuValue || 0} (for {solAmount || 0} SOL)
      </p> */}

      <div
        onClick={
          !isPhantomInstalled
            ? handleInstall
            : publicKey
            ? handlePayment
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
          pointerEvents: loading ? "none" : "auto",
          backgroundImage: loading
            ? "radial-gradient(circle at left, black 0%, crimson 70%)"
            : "radial-gradient(circle at left, #9a2929 0%, black 70%)",
        }}
      >
        <div className="sm:w-[32.71px] h-7">
          <img
            src="melon-left.png"
            alt="melon-left"
            className="h-full w-full"
          />
        </div>

        <div
          className="text-red-500 text-5xl whitespace-nowrap"
          style={{
            textShadow:
              "1px 0px 2px rgba(255, 255, 255, 0.5), 2px 0px 4px rgba(0, 255, 0, .6)",
          }}
        >
          {loading
            ? "Processing..."
            : !isPhantomInstalled
            ? "Install Wallet"
            : publicKey
            ? "Pay"
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
    </div>
  );
};

export default BuyButton;
