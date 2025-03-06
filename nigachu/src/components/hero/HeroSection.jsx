import LeftHero from "./LeftHero";
import RightHero from "./RightHero";

const HeroSection = () => {
  return (
    <div className="flex justify-evenly items-center gap-36 sm:gap-0 lg:gap-36 md:min-h-screen flex-col md:flex-row relative z-40">
      <LeftHero />
      <RightHero />
    </div>
  );
};

export default HeroSection;
