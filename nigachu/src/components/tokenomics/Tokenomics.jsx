const Tokenomics = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen px-4 py-8 covered-by-your-grace-light">
      {/* Title Section */}
      <h1 className="text-gradient-green-dark text-center text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-['Covered By Your Grace'] mb-12">
        TOKENOMICS
      </h1>

      {/* Tokenomics Box */}
      <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-b from-[#171e0e] via-black to-[#290f0f] rounded-[79px] border-4 border-[#9cc663] shadow-xl px-8 py-12 max-w-[90%] lg:max-w-5xl w-full md:w-[1046px] md:h-[491px] h-auto md:gap-32">
        {/* Circular Chart Section */}
        <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
          <img
            src="pie-chart.png"
            alt="Pie Chart"
            className="max-w-[280px] sm:max-w-[350px] lg:max-w-[400px] md:w-[389px] md:h-[389px]"
          />
        </div>

        {/* Tokenomics Details Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">
          {[
            { label: "50% presale", color: "#9cc663" },
            { label: "30% liquidity pool", color: "#ea4d4e" },
            { label: "15% marketing", color: "#909090" },
            { label: "5% team", color: "#d7d7d7" },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center w-1/2 mb-6 md:w-full lg:justify-start"
            >
              <div
                className={`w-6 h-6 lg:w-8 lg:h-8 rounded-full border-4 border-white`}
                style={{ backgroundColor: item.color }}
              ></div>
              <p
                className={`text-2xl sm:text-4xl lg:text-5xl ml-4 font-['Covered By Your Grace']`}
                style={{ color: item.color }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tokenomics;
