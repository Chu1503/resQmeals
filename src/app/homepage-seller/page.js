"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { Icon } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import axios from "axios";
import { useRouter } from "next/navigation";

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [foodName, setFoodName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const handleRegister = async () => {
    try {
      const storedDataString = localStorage.getItem("buyerData");
      if (storedDataString) {
        const storedData = JSON.parse(storedDataString); // Parse the JSON string
        const response = await axios.post(
          "https://res-qmeals-backend.vercel.app/api/postPost",
          {
            restaurant_id: storedData,
            food_name: foodName,
            item_quantity: itemQuantity,
            claimer: null,
            status: false,
          }
        );
        const responseData = response.data; // No need to parse since it's already JSON
        const extractedRestaurantId = responseData.restaurant_id; // Extract restaurant ID
        console.log("Response Data:", extractedRestaurantId); // Log the extracted restaurant ID
      }
      // Now you can pass the extracted restaurant ID to other functions or use it as needed
    } catch (error) {
      console.error("Error posting food information:", error);
    }
  };

  const handlePost = () => {
    onSubmit({ foodName, itemQuantity });
    handleRegister();
    onClose();
    window.location.reload();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "block" : "hidden"}`}>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
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
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "https://res-qmeals-backend.vercel.app/api/fetchRestaurants"
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    fetchPosts();
  }, []);

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
        {posts.map((post, index) => (
          <div key={index} className="flex items-center justify-center m-4">
            <div className="flex flex-col items-center p-10 rounded-3xl sm:w-[15vw] sm:h-[25vh] w-[40vw] h-[15vh] bg-[#333333] border border-solid border-[#F7D097] shadow-xl">
              <h1 className="text-white text-3xl font-bold p-15">
                {post.restaurant_name?.replace(/["0-9_]/g, "")}
              </h1>

              <h1 className="text-[#FFFFFF] text-1xl sm:text-1xl tracking-wide font-thin mt-8">
                Food Item : {post.food_type}
              </h1>
              <h1 className="text-[#FFFFFF] text-1xl sm:text-1xl tracking-wide font-thin mt-1">
                Quantity : {post.quantity}
              </h1>
            </div>
          </div>
        ))}
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
