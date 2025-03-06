const WavyDottedBG = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Generate multiple dots randomly spread */}
      {Array.from({ length: 300 }).map((_, index) => (
        <div
          key={index}
          className="absolute bg-gray-500 rounded-full animate-groupWave"
          style={{
            width: `${Math.random() * 4 + 2}px`, // Random size between 2px and 6px
            height: `${Math.random() * 4 + 2}px`,
            top: `${Math.random() * 100}%`, // Random vertical position
            left: `${Math.random() * 100}%`, // Random horizontal position
            animationDelay: `${Math.random() * 5}s`, // Random delay for randomness
          }}
        ></div>
      ))}
    </div>
  );
};

export default WavyDottedBG;
