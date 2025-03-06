const Roadmap = () => {
  return (
    <div className="flex flex-col items-center w-full bg-black text-white py-12 px-4 covered-by-your-grace-light">
      {/* Title Section */}
      <h1 className="text-gradient-red-dark text-center text-5xl sm:text-7xl md:text-9xl font-['Covered By Your Grace'] mb-12">
        ROADMAP
      </h1>

      {/* Timeline */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full max-w-[90%] sm:max-w-[80%] relative">
        {/* Line */}
        {/* <div className="absolute w-full h-1 bg-[#2d2d2d] top-1/2 transform -translate-y-1/2"></div> */}

        {/* Phase 1 */}
        <div className="flex flex-col items-center text-center sm:mr-8 relative">
          <div className="w-6 h-6 bg-[#9cc663] rounded-full border-2 border-white"></div>
          <h3 className="text-[#9cc663] text-2xl sm:text-4xl font-['Covered By Your Grace'] mt-4">
            PHASE 1
          </h3>
          <p className="text-sm sm:text-lg md:text-xl text-[#9cc663] mt-2">
            NIGACHU COIN PRESALE <br /> LIST THE $NIGACHU TOKEN
          </p>
        </div>

        {/* Phase 2 */}
        <div className="flex flex-col items-center text-center sm:mx-8 relative">
          <div className="w-6 h-6 bg-white rounded-full border-2 border-[#9cc663]"></div>
          <h3 className="text-white text-2xl sm:text-4xl font-['Covered By Your Grace'] mt-4">
            PHASE 2
          </h3>
          <p className="text-sm sm:text-lg md:text-xl text-white mt-2">
            Enable partnership with other platforms <br />
            web3 tools and APIs
          </p>
        </div>

        {/* Phase 3 */}
        <div className="flex flex-col items-center text-center sm:ml-8 relative">
          <div className="w-6 h-6 bg-white rounded-full border-2 border-[#ec5c5b]"></div>
          <h3 className="text-white text-2xl sm:text-4xl font-['Covered By Your Grace'] mt-4">
            PHASE 3
          </h3>
          <p className="text-sm sm:text-lg md:text-xl text-white mt-2">
            Launch NIGACHU Games <br />
            Airdrops <br />
            Enable staking and farming
          </p>
        </div>

        {/* Phase 4 */}
        <div className="flex flex-col items-center text-center sm:ml-8 relative">
          <div className="w-6 h-6 bg-white rounded-full border-2 border-[#d7d7d7]"></div>
          <h3 className="text-white text-2xl sm:text-4xl font-['Covered By Your Grace'] mt-4">
            PHASE 4
          </h3>
          <p className="text-sm sm:text-lg md:text-xl text-white mt-2">
            Onboard Initial projects on launchpad <br />
            NIGACHU NFT Launch <br />
            Implement DAO governance for community <br />
            decision-making
          </p>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
