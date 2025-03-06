// eslint-disable-next-line react/prop-types
const ClaimTokenModal = ({ visible, setVisible }) => {
  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 backdrop-blur-md z-[100]"
      onClick={() => setVisible(false)}
    >
      {/* Modal Content */}
      <div
        className="relative bg-gradient-to-b from-[#151c0c] via-black to-[#260b0b] rounded-[50px] border-2 border-[#9cc663] p-6 w-full md:w-[641px] md:h-[349px] flex justify-center items-center flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Title */}
        <div className="text-center text-gradient-green text-2xl sm:text-[32px] font-normal font-['Covered By Your Grace'] mb-4">
          YOU CAN CLAIM YOUR TOKEN AFTER PRESALE
        </div>
        {/* Subtitle */}
        <div className="text-center text-gradient-red text-xl sm:text-[32px] font-normal font-['Covered By Your Grace'] mb-6">
          JOIN OUR TG FOR MORE INFO
        </div>
        {/* Button */}
        <div className="flex justify-center items-center gap-2">
          <div>
            <img src="telegram.svg" alt="telegram" className="h-full" />
          </div>
          <div className="relative mx-auto sm:w-[399px] sm:h-[120px] pb-1">
            <div className="absolute inset-0 bg-[#5f201f] rounded-[91px]" />
            <div
              className="relative bg-[#a5403f] rounded-[91px] border-2 border-[#ec5c5b] sm:w-[399px] sm:h-[115px]"
              style={{
                textShadow:
                  "1px 0px 2px rgba(255, 255, 255, 0.5), 2px 0px 4px rgba(0, 255, 0, .6)",
                backgroundImage:
                  "radial-gradient(circle at left, #9a2929 0%, black 70%)",
              }}
            >
              <button
                className="w-full h-full text-[#ffb2b2] text-2xl sm:text-[64px] font-normal font-['Covered By Your Grace'] py-3"
                onClick={() => alert("Redirecting to Telegram...")}
              >
                JOIN NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimTokenModal;
