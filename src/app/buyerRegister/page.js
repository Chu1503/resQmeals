"use client";
import React, { useState } from "react";
import axios from "axios";
import Marquee from "react-fast-marquee";

const BuyerRegister = () => {
  const [buyer_name, setBuyerName] = useState("");
  const [buyer_contact_number, setBuyerContactNumber] = useState("");
  const [buyer_address, setBuyerAddress] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://res-qmeals-backend-7lfm.vercel.app/api/postBuyer",
        {
          buyer_name: buyer_name,
          buyer_contact_number: buyer_contact_number,
          buyer_address: buyer_address,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting buyer information:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-[#F7D098] flex justify-center items-center">
        <div className="relative overflow-x-hidden overflow-y-hidden w-screen h-screen align-center items-center">
          <Marquee
            speed={50}
            delay={1}
            direction="left"
            autoFill
            pauseOnClick
            className="z-0"
          >
            <h1 className="m-1 rounded-xl flex space-x-5 p-4 font-bold text-8xl cursor-pointer text-[#FFFFFF]">
              BUYER.
            </h1>
          </Marquee>
          <Marquee
            speed={130}
            delay={0.3}
            direction="right"
            autoFill
            pauseOnClick
            className="z-0"
          >
            <h1 className="m-1 rounded-xl flex space-x-5 p-4 font-bold text-8xl cursor-pointer text-[#212121]">
              BUYER.
            </h1>
          </Marquee>
          <Marquee
            speed={70}
            delay={2}
            direction="left"
            autoFill
            pauseOnClick
            className="z-0"
          >
            <h1 className="m-1 rounded-xl flex space-x-5 p-4 font-bold text-8xl cursor-pointer text-[#FFFFFF]">
              BUYER.
            </h1>
          </Marquee>
          <Marquee
            speed={90}
            direction="right"
            autoFill
            pauseOnClick
            className="z-0"
          >
            <h1 className="m-1 rounded-xl flex space-x-5 p-4 font-bold text-8xl cursor-pointer text-[#212121]">
              BUYER.
            </h1>
          </Marquee>
          <Marquee
            speed={100}
            delay={0.7}
            direction="left"
            autoFill
            pauseOnClick
            className="z-0"
          >
            <h1 className="m-1 rounded-xl flex space-x-5 p-4 font-bold text-8xl cursor-pointer text-[#FFFFFF]">
              BUYER.
            </h1>
          </Marquee>
          <Marquee
            speed={20}
            delay={0.1}
            direction="right"
            autoFill
            pauseOnClick
            className="z-0"
          >
            <h1 className="m-1 rounded-xl flex space-x-5 p-4 font-bold text-8xl cursor-pointer text-[#212121]">
              BUYER.
            </h1>
          </Marquee>
          <Marquee
            speed={150}
            direction="left"
            autoFill
            pauseOnClick
            className="z-0"
          >
            <h1 className="m-1 rounded-xl flex space-x-5 p-4 font-bold text-8xl cursor-pointer text-[#FFFFFF]">
              BUYER.
            </h1>
          </Marquee>
        </div>
        <div className="flex flex-col absolute items-center p-10 rounded-xl shadow-xl w-[85vw] sm:w-[25vw] bg-[#212121] z-100">
          <h1 className="text-[#F7D098] text-4xl sm:text-5xl tracking-widest mb-5">
            Register
          </h1>
          <input
            type="text"
            placeholder="Name"
            value={buyer_name} // Bind value to state
            onChange={(e) => setBuyerName(e.target.value)} // Update state on change
            className="w-[75vw] sm:w-full p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={buyer_contact_number} // Bind value to state
            onChange={(e) => setBuyerContactNumber(e.target.value)} // Update state on change
            className="w-[75vw] sm:w-full p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white"
          />
          <textarea
            placeholder="Address"
            value={buyer_address} // Bind value to state
            onChange={(e) => setBuyerAddress(e.target.value)} // Update state on change
            className="w-[75vw] sm:w-full h-[20vh] p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white resize-none"
          />
          <button
            onClick={handleRegister}
            className="w-auto mt-4 p-4 rounded-xl font-black bg-[#F7D098] text-[#212121] hover:bg-white"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default BuyerRegister;
