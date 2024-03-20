"use client"
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const Homepage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 w-screen h-[10vh] flex flex-row items-center justify-around bg-gray-900">
        <h1 className="text-white text-3xl font-bold p-5">ResQMeals</h1>
        <button
          onClick={logOut}
          className="px-4 py-2 bg-transparent border-1 border-[#00D094] text-[#FF0000] text-lg rounded-md flex items-center"
        >
          <Icon as={FiLogOut} boxSize={28} color="#FF0000" className="mr-2" />
          LOG OUT
        </button>
      </div>
    </div>
  );
};

export default Homepage;