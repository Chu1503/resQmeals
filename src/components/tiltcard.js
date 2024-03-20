import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

import { FaCartShopping } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = () => {
  const ref = useRef(null);

  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rY = mouseX / width - HALF_ROTATION_RANGE;
    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div style={{ display: "flex" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: "translateZ(500px)",
          transformStyle: "preserve-3d",
          backdropFilter: "blur(100px)",
          backgroundColor: "rgba(255, 255, 255, 0.10)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "20px", // Add margin for spacing between cards
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        className="relative h-[50vh] w-[50vh] rounded-xl flex flex-row items-center"
      >
        <div class="flex flex-col items-center">
          <FaShop size={32}/>
          <h1 className="text-5xl font-bold">Seller</h1>
        </div>
      </motion.div>
      <motion.div
        style={{
          transform: "translateZ(500px)",
          transformStyle: "preserve-3d",
          backdropFilter: "blur(100px)",
          backgroundColor: "rgba(255, 255, 255, 0.10)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        className="relative h-[50vh] w-[50vh] rounded-xl flex flex-row items-center"
      > 
      <div class="flex flex-col items-center">
        <FaCartShopping size={32} />
        <h1 className="text-5xl font-bold">Buyer</h1>
        </div>
        
      </motion.div>
      <motion.div
        style={{
          transform: "translateZ(500px)",
          transformStyle: "preserve-3d",
          backdropFilter: "blur(100px)",
          backgroundColor: "rgba(255, 255, 255, 0.10)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: "20px",
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        className="relative h-[50vh] w-[50vh] rounded-xl flex flex-row items-center"
      > 
      <div class="flex flex-col items-center">
        <MdDeliveryDining size={33} />
        <h1 className="text-5xl font-bold">Driver</h1>
        </div>
        
      </motion.div>
    </div>
  );
};

export default TiltCard;