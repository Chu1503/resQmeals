import React from "react";
import TiltCard from "./tiltcard";
import ParticlesComponent from "@/components/particles/particles";
import "@/components/particles/particles.css";

const SelectPage = () => {
  return (
    <>
      <div className="h-screen w-screen flex sm:flex-col flex-row items-center justify-center text-center overflow-hidden bg-[#F7D098] sm:bg-transparent">
      <ParticlesComponent id="particles" />
        <TiltCard />
      </div>
    </>
  );
};

export default SelectPage;
