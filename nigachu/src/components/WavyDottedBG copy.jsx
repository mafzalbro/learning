const WavyDottedBG = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          {/* Top region */}
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={`top-${index}`}
              className="absolute bg-gray-500 rounded-full animate-"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${Math.random() * 30}%`, // Top 30% of the screen
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0">
          {/* Middle region */}
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={`middle-${index}`}
              className="absolute bg-gray-500 rounded-full animate-groupWaveMiddle"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${30 + Math.random() * 40}%`, // Middle 40% of the screen
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
        <div className="absolute inset-0">
          {/* Bottom region */}
          {Array.from({ length: 100 }).map((_, index) => (
            <div
              key={`bottom-${index}`}
              className="absolute bg-gray-500 rounded-full animate-groupWaveBottom"
              style={{
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                top: `${70 + Math.random() * 30}%`, // Bottom 30% of the screen
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default WavyDottedBG;
