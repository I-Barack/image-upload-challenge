import React from "react";
import DragDrop from "../components/DragDrop";
import Navbar from "../components/Navbar";

const Hero = () => {
  return (
    <div className="w-screen h-screen relative">
      <Navbar />
      <DragDrop />
    </div>
  );
};

export default Hero;
