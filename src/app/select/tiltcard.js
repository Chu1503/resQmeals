import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import SellerRegister from "../sellerRegister/page";

import { FaCartShopping } from "react-icons/fa6";
import { FaShop } from "react-icons/fa6";
import { MdDeliveryDining } from "react-icons/md";

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = () => {
  const ref = useRef(null);
  const router = useRouter();

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
        onClick={() => router.push("/sellerRegister")}
        style={{
          transform: "translateZ(500px)",
          transformStyle: "preserve-3d",
          boxShadow: "0 0 20px rgba(255, 255, 255, 1)", // Adding glow effect
          backgroundColor: "rgb(33, 33, 33)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginRight: "100px",
        }}
        animate={{
          rotateX,
          rotateY,
        }}
        className="relative h-[50vh] w-[50vh] rounded-xl flex flex-row items-center"
      >
        <div className="flex flex-col items-center gap-5">
          <FaShop size={180} color="#D9D9D9" />
          <h1 className="text-3xl font-light text-[#D9D9D9]">Seller</h1>
        </div>
      </motion.div>
      <motion.div
        onClick={() => router.push("/buyerRegister")}
        style={{
          transform: "translateZ(500px)",
          transformStyle: "preserve-3d",
          boxShadow: "0 0 20px rgba(255, 255, 255, 1)", // Adding glow effect
          backgroundColor: "rgb(33, 33, 33)",
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
        <div className="flex flex-col items-center gap-5">
          <FaCartShopping size={180} color="#D9D9D9" />
          <h1 className="text-3xl font-light text-[#D9D9D9]">Buyer</h1>
        </div>
      </motion.div>
    </div>
  );
};

export default TiltCard;
