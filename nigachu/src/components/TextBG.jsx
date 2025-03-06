import { useEffect, useState } from "react";

const TextBG = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <div className="fixed top-0 w-[120vw] h-screen overflow-hidden bg-black">
        {/* Text Background */}
        <div className="absolute inset-0 flex flex-wrap sm:text-4xl font-extrabold pointer-events-none select-none">
          {Array.from({ length: 500 }).map((_, index) => (
            <span
              key={index}
              className="text-gray-700 opacity-100 golos-text-normal mx-2"
            >
              NIGHACHU
            </span>
          ))}
        </div>
      </div>
      {/* Dark Layer with Reveal Effect */}
      <div
        className="absolute inset-0 bg-black opacity-100 pointer-events-none z-[0]"
        style={{
          maskImage: `radial-gradient(circle 200px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 50%, black 100%)`,
          WebkitMaskImage: `radial-gradient(circle 200px at ${cursorPosition.x}px ${cursorPosition.y}px, transparent 50%, black 100%)`,
        }}
      ></div>
    </>
  );
};

export default TextBG;
