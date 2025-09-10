import Logo from "../assets/logo.svg";
import DarkLogo from "../assets/dark-logo.svg";
import MobileLogo from "../assets/logo-small.svg";
import Dark from "../assets/Moon_fill.svg";
import Light from "../assets/Sun_fill.svg";
import { useUploadContext } from "../hooks/useUploadContext";

const Navbar = () => {
  const { mode, setMode } = useUploadContext();
  return (
    <div
      className={`w-full h-20 flex items-center justify-between px-12 border-b z-10 transition duration-700 ${
        mode ? "bg-[#212936] border-[#121826]" : "bg-[#f9fafb] border-[#e5e7eb]"
      }`}
    >
      <div>
        <img src={mode ? DarkLogo : Logo} alt="Logo" />
      </div>
      <div
        className={`cursor-pointer shadow-sm p-2 rounded-sm transition duration-700 ${
          mode ? "bg-[#4d5562]" : "bg-[#f9fafb]"
        }`}
      >
        <img
          onClick={() => setMode((prev) => !prev)}
          src={mode ? Light : Dark}
          alt="DarkMode"
          className=""
        />
      </div>
    </div>
  );
};

export default Navbar;
