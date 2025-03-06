// eslint-disable-next-line react/prop-types
const ProgressBar = ({ percentage }) => {
  return (
    <div className="text-center font-sans pb-8 px-4">
      <div className="relative mx-auto h-[33.75px] bg-gradient-to-r from-white to-black rounded-[60px] border border-[#ea4d4e]">
        {/* Progress indicator */}
        <div
          className="absolute top-0 left-0 h-full bg-[#ea4d4e] rounded-[60px] border border-[#ea4d4e]"
          style={{ width: `${percentage}%` }}
        ></div>
        {/* Progress percentage display */}
        <img
          className="absolute -top-4 w-[61.11px] h-[45.60px]"
          src="progress.gif"
          style={{ left: `calc(${percentage}% - 30.56px)` }}
          alt="Progress Indicator"
        />
        {/* CUP Image at the right side */}
        <div className="absolute -right-2 w-[74px] h-[61px]">
          <img
            className="w-[74px] h-[61px] absolute -top-6 right-0"
            src="cup.png"
          />
          <img
            className="w-[40.19px] h-[36.06px] origin-top-left rotate-[13.30deg] absolute top-1 left-8"
            src="melon-right.png"
          />
        </div>
      </div>
      {/* Display Progress Percentage */}
      {/* <div className="mt-2 text-white text-sm">{percentage}%</div> */}
    </div>
  );
};

export default ProgressBar;
