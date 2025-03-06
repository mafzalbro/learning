import { RiInstagramFill, RiTelegram2Fill, RiTiktokFill } from "react-icons/ri";
const Footer = () => {
  return (
    <div
      className="w-full h-auto bg-cover bg-repeat-x sm:bg-contain bg-center py-6 flex flex-col sm:flex-row items-center justify-around gap-6 relative z-50"
      style={{ backgroundImage: `url('bar.png')` }}
    >
      {/* About Section */}
      {/* <div className="text-center sm:text-left">
        <h3 className="text-white text-2xl sm:text-4xl covered-by-your-grace-light mb-2">
          About
        </h3>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-[300px]">
          Nigachu is an innovative platform bringing you the best in web3,
          community engagement, and digital experiences. Join us as we
          revolutionize the future!
        </p>
      </div> */}

      {/* Contact Section */}
      {/* <div className="text-center sm:text-left">
        <h3 className="text-white text-2xl sm:text-4xl covered-by-your-grace-light mb-2">
          Contact
        </h3>
        <p className="text-gray-300 text-sm sm:text-base">
          Email:{" "}
          <a
            href="mailto:support@nigachu.com"
            className="text-red-400 hover:underline"
          >
            support@nigachu.com
          </a>
        </p>
        <p className="text-gray-300 text-sm sm:text-base">
          Phone:{" "}
          <a href="tel:+1234567890" className="text-red-400 hover:underline">
            +123 456 7890
          </a>
        </p>
        <p className="text-gray-300 text-sm sm:text-base">
          Address: 123 Web3 Lane, Metaverse City
        </p>
      </div> */}

      {/* Social Links */}
      <div className="flex items-center sm:items-start w-full justify-center sm:gap-12 gap-4">
        <h3 className="stroke sm:text-6xl text-3xl text-white covered-by-your-grace-light">
          Social Links
        </h3>
        <div className="flex gap-4 sm:text-6xl text-3xl">
          <a
            href="https://www.instagram.com/niigachuonsol?igsh=ejlld2s3enBlOTQw&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-black rounded-xl hover:text-red-500 transition"
          >
            <RiInstagramFill />
          </a>
          <a
            href="https://tiktok.com/@nigachu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-black rounded-xl hover:text-red-500 transition"
          >
            <RiTiktokFill />
          </a>
          <a
            href="https://t.me/+gkMto2cCB5RjYjNl"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-black rounded-xl hover:text-red-500 transition"
          >
            <RiTelegram2Fill />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
