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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  const logOut = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully.");
      setUser(null);
      router.push("/")
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPost = (content) => {
    setPosts([...posts, content]);
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden bg-[#212121]">
      <div className="absolute top-0 w-screen h-[10vh] flex flex-row items-center justify-around bg-black">
        <h1 className="text-[#F7D098] text-3xl font-bold p-5">resQmeals</h1>
        <button
          onClick={logOut}
          className="px-4 py-2 bg-transparent text-[#F7D098] text-lg rounded-md flex items-center"
        >
          <Icon as={FiLogOut} boxSize={28} color="#F7D098" className="mr-2" />
          LOG OUT
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {[...posts].map((post, index) => (
          <div key={index} className="flex items-center justify-center m-4">
            <div className="flex flex-col items-center p-10 rounded-3xl sm:w-[15vw] sm:h-[25vh] w-[40vw] h-[15vh] bg-[#333333] border border-solid border-[#F7D097] shadow-xl">
              <h1 className="text-white text-3xl font-bold p-15">{localStorage.getItem("buyerData").substring(1).split('_')[0]}</h1>
              <h1 className="text-[#FFFFFF] text-1xl sm:text-1xl tracking-wide font-thin mt-8">
                Food Item : {post.foodName}
              </h1>
              <h1 className="text-[#FFFFFF] text-1xl sm:text-1xl tracking-wide font-thin mt-1">
                Quantity : {post.itemQuantity}
              </h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
