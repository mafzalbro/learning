import { useState } from "react";
import CliamTokenModal from "./CliamTokenModal";

const ClaimDeal = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleClaimClick = () => {
    setModalVisible(true);
  };

  return (
    <div className="flex justify-center mt-12 h-[400px] sm:mt-24 relative z-[1000] covered-by-your-grace-light">
      {/* Claim Token Modal */}
      <CliamTokenModal visible={isModalVisible} setVisible={setModalVisible} />

      <div className="text-white w-full">
        <div className="w-full md:w-[726px] sm:mx-auto h-full relative">
          {/* Title Section */}
          <div className="text-center absolute z-0 -top-14 md:-top-24 text-[#f2454b] text-6xl md:text-9xl font-normal font-['Covered By Your Grace'] mb-8 w-full">
            Claim tokens
          </div>

          {/* Inner Box */}
          <div className="w-full bg-gradient-to-b from-[#9CC663] to-[#EC5C5B] p-0.5 rounded-[50px] border-white shadow-[0_4px_40px_20px_rgba(0,0,0,1)] sm:p-0.5 absolute">
            <div className="bg-gradient-to-b from-[#171e0e] via-black to-[#290f0f] rounded-[50px] p-2">
              {/* Content inside the box */}
              <div className="text-gradient-green text-4xl md:text-5xl font-normal font-['Covered By Your Grace'] text-center my-8">
                Claim your purchased tokens
              </div>
              {/* Claim Button */}
              <div className="mx-auto w-[90%] lg:w-[501px] h-[70px] md:h-[77px] bg-[#480c0c] rounded-full pb-2">
                <button
                  className="w-full h-full bg-[#ea4d4e] text-[#ffffff] text-xl sm:text-5xl font-normal font-['Covered By Your Grace'] rounded-full border border-[#ec5c5b] shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-[#ea4d4e] transition-colors text-red-500 whitespace-nowrap w-full"
                  style={{
                    textShadow:
                      "1px 0px 2px rgba(255, 255, 255, 0.5), 2px 0px 4px rgba(0, 255, 0, .6)",
                    backgroundImage:
                      "radial-gradient(circle at left, #9a2929 0%, black 70%)",
                  }}
                  onClick={handleClaimClick}
                >
                  <img
                    src="claim-tokens.png"
                    alt="claim-tokens"
                    className="w-1/3 lg:w-1/2 mx-auto"
                  />
                </button>
              </div>
              <div className="text-gradient-red text-lg sm:text-[32px] font-normal font-['Covered By Your Grace'] text-center mt-8 mb-4">
                join telegram group for support{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimDeal;
