"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import axios from 'axios';

const Modal = ({ isOpen, onClose }) => {
  const [foodName, setFoodName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://res-qmeals-backend.vercel.app/api/postPost",
        {
          restaurant_id: "mud_cups_1710950417023",
          food_name: foodName,
          item_quantity: itemQuantity,
          claimer: null,
          status: false
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting food information:", error);
    }
  };

  const handlePost = () => {
    handleRegister();
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="flex flex-col modal-content bg-[#212121] p-5 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-[#F7D098] text-4xl mb-5">Create Post</h1>
        <input
          type="text"
          placeholder="Food Item Name"
          className="w-[75vw] sm:w-[20vw] p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Item Quantity"
          className="w-[75vw] sm:w-[20vw] p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="w-auto mt-4 mb-4 p-4 rounded-xl font-black bg-[#F7D098] text-[#212121] hover:bg-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const Homepage = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Use useEffect here
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

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleSubmitPost = (content) => {
    console.log("Submitted post content:", content);
    // You can add logic here to handle the submission of the post content
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center text-center overflow-hidden">
      <div className="absolute top-0 w-screen h-[10vh] flex flex-row items-center justify-around bg-gray-900">
        <h1 className="text-white text-3xl font-bold p-5">resQmeals</h1>
        <button
          onClick={logOut}
          className="px-4 py-2 bg-transparent border-1 border-[#00D094] text-[#FF0000] text-lg rounded-md flex items-center"
        >
          <Icon as={FiLogOut} boxSize={28} color="#FF0000" className="mr-2" />
          LOG OUT
        </button>
      </div>
      <button
        className="bg-[#F7D098] hover:bg-white text-[#212121] font-bold text-md rounded-md p-3 absolute bottom-[10vh]"
        onClick={handleModalOpen}
      >
        CREATE POST
      </button>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleSubmitPost}
      />
    </div>
  );
};

export default Homepage;
