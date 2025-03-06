import { useState } from "react";
import Cards from "./Cards";
import NigachuPrices from "./NigachuPrices";

const Form = () => {
  const [userPublicAddress, setUserPublicAddress] = useState("");

  // Function to generate referral link and copy to clipboard
  const generateReferralLink = () => {
    if (!userPublicAddress) {
      alert("Please connect your wallet to generate a referral link.");
      return;
    }

    const referralLink = `${window.location.host}?ref=${userPublicAddress}`;
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        alert("Link copied: " + referralLink);
      })
      .catch(() => {
        alert("Failed to copy the referral link.");
      });
  };

  return (
    <div className="form p-4 w-full lg:w-[600px] lg:h-[625.67px]">
      <div className="sm:w-10/12 sm:max-w-screen-sm mx-auto !relative bg-gradient-to-b from-[#353535] to-black rounded-[39px] border-[3px] border-white bg-white covered-by-your-grace-light">
        <div className="gif absolute -top-[190px] sm:-top-[140px] lg:-top-[200px] left-[50%] transform -translate-x-[50%] lg:h-[246.26px] lg:w-[246.26px] sm:w-1/2 h-auto -z-10">
          <img
            src="nigha-eating.gif"
            alt="left-hero-title"
            className="sm:w-full h-auto"
          />
        </div>
        <div className="title text-center text-6xl covered-by-your-grace-regular my-6">
          <h2>buy $nigachu</h2>
        </div>

        {/* Progress Section */}

        {/* <ProgressBar percentage={30} /> */}

        {/* NigachuPrices */}
        <NigachuPrices />

        {/* Cards Button */}
        <Cards setUserPublicAddress={setUserPublicAddress} />

        <div className="mx-auto w-2/3 my-4">
          <img src="separator.svg" alt="separator" />
        </div>

        {/* Actions Section */}
        <div className="mx-auto my-2 text-base sm:text-lg px-2">
          {/* <div
            onClick={generateReferralLink}
            className="bg-neutral-700 cursor-pointer rounded-[51px] border text-center py-2 border-white w-full sm:h-[40.83px] sm:w-[223.45px] sm:mx-auto"
          >
            Generate Referral Link
          </div> */}
          <div className="pt-2 sm:mx-auto sm:w-11/12">
            <label className="py-1 text-center block" htmlFor="sol-address">
              connect wallet to get refferal link
            </label>
            <div className="relative">
              <input
                id="sol-address"
                className="bg-neutral-700 rounded-[51px] w-full border p-2 border-white sm:h-[40.83px] shadow-[10px_0_20px_5px_rgba(255,255,255,0.2)]"
                value={`${window.location.host}?ref=${userPublicAddress}`}
                onChange={(e) => setUserPublicAddress(e.target.value)}
                disabled
              />
              <button className="absolute top-1/2 -translate-y-1/2 right-1 w-60 h-full flex justify-end items-center shadow-[10px_0_20px_rgba(0,0,0,1)] bg-gradient-to-l from-black to-transparent rounded-full">
                <img
                  onClick={generateReferralLink}
                  src="copy-btn.svg"
                  alt="copy-btn"
                  className="drop-shadow-[10px_0_20px_rgba(0,0,0,0.1)] pr-2"
                />
              </button>
            </div>

            <div className="text-center pt-1 sm:text-xl">
              Get 20% of token purchased
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
