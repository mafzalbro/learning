import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
  Keypair,
} from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  getAssociatedTokenAddress,
  createAssociatedTokenAccountInstruction,
  createTransferInstruction,
} from "@solana/spl-token";
import QUICKNODE_RPC from "../../credentials/quicknode_rpc";
import nighachuMintAddress from "../../credentials/nigachu_address";
import address from "../../credentials/address";
// import walletJson from "../../credentials/wallet.json";
import { Buffer } from "buffer";
window.Buffer = Buffer;

// eslint-disable-next-line react/prop-types
const BuyButton = ({ solAmount, nigachuValue, setUserPublicAddress }) => {
  const { publicKey, wallet, sendTransaction, connect, connected, select } =
    useWallet();
  const [loading, setLoading] = useState(false);
  // const [nigachuValue, setNigachuValue] = useState(0);
  // const [solPrice, setSolPrice] = useState(null);

  const connection = new Connection(QUICKNODE_RPC, "confirmed");
  const tokenMintAddress = new PublicKey(nighachuMintAddress);

  // Load the wallet from wallet.json
  // const ownerKeypair = Keypair.fromSecretKey(Uint8Array.from(walletJson));

  // const ownerAddress = ownerKeypair.publicKey;
  const ownerAddress = new PublicKey(address);

  console.log(Keypair.generate().secretKey.toString());

  const handlePayment = async () => {
    try {
      setLoading(true);
      if (!wallet) {
        alert("Please install a wallet to proceed.");
        return;
      }
      if (!connected) await connect();

      if (!publicKey) {
        alert("Failed to connect wallet.");
        return;
      }

      if (!solAmount || solAmount <= 0) {
        alert("Please enter a valid SOL amount.");
        return;
      }

      const amountInLamports = solAmount * 1e9;

      // Transfer SOL
      const solTransferTx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: ownerAddress,
          lamports: amountInLamports,
        })
      );
      const solSignature = await sendTransaction(solTransferTx, connection);
      await connection.confirmTransaction(solSignature, "confirmed");

      // Transfer Nigachu tokens
      await transferNigachuTokens(publicKey, nigachuValue);
      alert("Payment Successful! Nigachu Tokens Sent.");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const transferNigachuTokens = async (userPublicKey, nigachuValue) => {
    try {
      const userTokenAccount = await getAssociatedTokenAddress(
        tokenMintAddress,
        userPublicKey
      );

      const accountInfo = await connection.getAccountInfo(userTokenAccount);
      const transaction = new Transaction();

      // If user's associated token account doesn't exist, create it
      if (!accountInfo) {
        transaction.add(
          createAssociatedTokenAccountInstruction(
            ownerAddress, // Payer of the account creation
            userTokenAccount,
            userPublicKey,
            tokenMintAddress
          )
        );
      }

      // Transfer tokens
      const nigachuAmount = Math.round(parseFloat(nigachuValue) * 1e6); // Adjust decimals based on your token
      transaction.add(
        createTransferInstruction(
          await getAssociatedTokenAddress(tokenMintAddress, ownerAddress), // Owner's token account
          userTokenAccount, // User's token account
          ownerAddress, // Authority for the transfer
          nigachuAmount
        )
      );

      // Sign and send the transaction using the owner's keypair
      const signedTransaction = await connection.sendTransaction(transaction, [
        // ownerKeypair,
      ]);
      await connection.confirmTransaction(signedTransaction, "confirmed");
    } catch (error) {
      console.error("Failed to transfer Nigachu tokens:", error);
      throw error;
    }
  };

  const isPhantomInstalled = !!window?.solana?.isPhantom;

  useEffect(() => {
    setUserPublicAddress(publicKey?.toString());
    if (!wallet && isPhantomInstalled) {
      select("Phantom");
    }
  }, [wallet, select, isPhantomInstalled, setUserPublicAddress, publicKey]);

  const handleInstall = () => {
    window.open("https://phantom.app/", "_blank");
  };

  return (
    <div className="flex flex-col items-center w-full">
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
                  console.error("Failed to connect wallet:", error);
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
            src="left-melon.svg"
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
          {/* {loading
            ? "Processing..."
            : !isPhantomInstalled
            ? "Install Wallet"
            : publicKey
            ? "PaY"
            : "Connect Wallet"} */}
            <img src="buy-text.png" alt="buy-text" className="w-14 mx-auto"/>
        </div>
        <div className="sm:w-[32.71px] h-7">
          <img
            src="left-melon.svg"
            style={{ transform: "rotate(300deg)" }}
            alt="melon-right"
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BuyButton;
