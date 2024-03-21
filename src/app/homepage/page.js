"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";

const Homepage = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#212121]">
      <div className="absolute top-0 w-screen h-[10vh] flex flex-row items-center justify-around bg-black">
        <h1 className="text-[#F7D098] text-3xl font-bold p-5">resQmeals driver</h1>
        <button
          onClick={logOut}
          className="px-4 py-2 bg-transparent text-[#F7D098] text-lg rounded-md flex items-center"
        >
          <Icon as={FiLogOut} boxSize={28} color="#F7D098" className="mr-2" />
          {/* LOG OUT */}
        </button>
      </div>
      
    </div>
  );
};

export default Homepage;
