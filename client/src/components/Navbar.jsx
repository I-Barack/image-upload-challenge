import Logo from "../assets/logo.svg";
import MobileLogo from "../assets/logo-small.svg";
import Dark from "../assets/Moon_fill.svg";
import Light from "../assets/Sun_fill.svg";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full h-20 flex items-center justify-between px-4 bg-blue border-b border-gray-300 z-10">
      <div className="h-[60%]">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="p-2 border border-gray-300 rounded-sm">
        <img src={Dark} alt="DarkMode" />
      </div>
    </div>
  );
};

export default Navbar;
