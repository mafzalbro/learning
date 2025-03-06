// import AppCopy from "./AppCopy";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/hero/HeroSection";
// import WavyDottedBG from "./components/WavyDottedBG";
import TextBG from "./components/TextBG";
import WalletContextProvider from "./hooks/WalletContextProvider";
import Footer from "./components/Footer";
import ClaimDeal from "./components/claim/ClaimDeal";
import Tokenomics from "./components/tokenomics/Tokenomics";
import Roadmap from "./components/roadmap/Roadmap";

function App() {
  useEffect(() => {
    const images = document.querySelectorAll("img");
    console.log(images);
    images.forEach((image) => {
      image.style.pointerEvents = "none";
      image.style.userSelect = "none";
    });
  }, []);
  return (
    <>
      <WalletContextProvider>
        <div className="relative text-white shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] border border-black/20 sm:overflow-hidden">
          {/* <WavyDottedBG /> */}
          <TextBG />
          <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <ClaimDeal />
          <Tokenomics />
          <Roadmap />
          <Footer />
          </div>
        </div>

        {/* <AppCopy /> */}
      </WalletContextProvider>
    </>
  );
}

export default App;
