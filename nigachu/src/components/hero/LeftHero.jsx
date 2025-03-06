const LeftHero = () => {
  return (
    <div className="left-section flex flex-col sm::justify-start xl:justify-center pt-20 my-10 items-center md:h-screen w-full">
      <div className="mx-auto 2xl:w-[378px]">
        <img src="left-hero-title.png" alt="left-hero-title" />
      </div>
      <div className="mx-auto 2xl:w-[625px]">
        <img src="left-hero-naghchu.png" alt="left-hero-naghchu" />
      </div>
    </div>
  );
};

export default LeftHero;
