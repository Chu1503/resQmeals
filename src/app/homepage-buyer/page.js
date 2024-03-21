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
    const fetchPosts = async () => {
      try {
        const response = await axios.get("https://res-qmeals-backend.vercel.app/api/fetchRestaurants");
        const updatedPosts = response.data.map(post => {
          return {
            ...post,
            claimedBy: post.claimer ? post.claimer.replace(/\d{13}/g, "").replace(/_/g, " ") : null
          };
        });
        setPosts(updatedPosts);
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

  const handleClaimClick = async (index) => {
    try {
      const userData = localStorage.getItem("userData");
      const storedDataString = localStorage.getItem("buyerData");
      const postDataString = localStorage.getItem("postData");

      if (!userData) {
        console.error("User data not found in local storage");
        return;
      }

      // Parse storedDataString as JSON to remove quotes
      const storedData = JSON.parse(storedDataString);
      const postData = JSON.parse(postDataString);

      // Remove quotes from userData
      const cleanUserData = userData.replace(/['"]+/g, ""); // This removes both single and double quotes

      const response = await axios.post(
        "https://res-qmeals-backend.vercel.app/api/updateClaimer",
        {
          post_id: postData, // Assuming post_id is present in postData
          claimer: cleanUserData, // Use cleanUserData without quotes
          restaurant_id: storedData, // Use parsed JSON instead of string
        }
      );
      console.log(response.data); // Log the response from the backend

      // Update the claimedBy field of the specific post in the state
      const updatedPosts = [...posts];
      updatedPosts[index].claimedBy = cleanUserData; // Assuming userData contains the user ID without quotes
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error updating claimer:", error);
    }
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
          {/* LOG OUT */}
        </button>
      </div>
      <div className="flex flex-wrap justify-center">
        {posts.map((post, index) => (
          <div key={index} className="flex items-center justify-center m-4">
            <div className="flex flex-col items-center sm:p-10 p-5 rounded-3xl sm:w-[15vw] sm:h-[30vh] w-[40vw] h-[30vh] bg-[#333333] border border-solid border-[#F7D097] shadow-xl relative">
              <h1 className="text-white sm:text-3xl text-xl font-bold p-15">
                {post.restaurant_name?.replace(/["0-9_]/g, "")}
              </h1>

              <h1 className="text-[#FFFFFF] text-md sm:text-xl font-thin mt-3">
                Food: {post.food_type}
              </h1>
              <h1 className="text-[#FFFFFF] text-md sm:text-xl font-thin">
                Quantity: {post.quantity}
              </h1>
              <div className="absolute uppercase bottom-0 tracking-wide left-0 right-0 bg-[#F7D098] p-2 text-[#212121] text-md sm:text-xl font-bold text-center rounded-b-3xl">
                {post.claimedBy ? (
                  `Claimed by: ${post.claimedBy
                    .replace(/\d{13}/g, "")
                    .replace(/_/g, " ")}`
                ) : (
                  <button onClick={() => handleClaimClick(index)}>
                    Claim!
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
