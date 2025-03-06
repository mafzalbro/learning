const Navbar = () => {
  return (
    <div
      className="w-full h-4/6 bg-cover bg-repeat-x sm:bg-contain bg-center flex items-center justify-between px-4 gap-4 relative z-50"
      style={{ backgroundImage: `url('bar.png')` }}
    >
      {/* Add three images in a row */}
      <div>
        <img
          src="nighachu-icon.png"
          alt="nighachu icon"
          className="w-[80%] h-auto object-contain"
        />
      </div>
      <div className="covered-by-your-grace-light text-5xl">
        {/* <img
          src="presale.png"
          alt="presale"
          className="w-full h-auto object-contain"
        /> */}
        <span
          className="stroke relative text-white sm:text-8xl text-4xl"
        >
          PRESALE
        </span>
      </div>
      <div>
        {/* <img
          src="nigachu-nav-right.png"
          alt="nigachu-nav-right"
          className="w-full h-auto object-contain"
        /> */}
        <span className="stroke relative covered-by-your-grace-light text-white text-3xl sm:text-[64px]">
          nigachu
        </span>
      </div>
    </div>
  );
};

export default Navbar;
