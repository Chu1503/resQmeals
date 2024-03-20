import React, { useState } from "react";
import axios from "axios";

const SellerRegister = () => {
  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        "https://res-qmeals-backend-7lfm.vercel.app/api/postRestaurant",
        {
          restaurant_name: name,
          contact_number: contactNumber, // Pass contact number
          address: address, // Pass address
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error posting restaurant:", error);
    }
  };

  return (
    <>
      <div className="h-screen w-screen bg-[#F7D098] flex justify-center items-center">
        <div className="flex flex-col items-center p-10 rounded-xl shadow-xl w-[85vw] sm:w-[25vw] bg-[#212121]">
          <h1 className="text-[#F7D098] text-4xl sm:text-5xl tracking-widest mb-5">
            Register
          </h1>
          <input
            type="text"
            placeholder="Restaurant Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[75vw] sm:w-full p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white"
          />
          <input
            type="text"
            placeholder="Contact Number"
            value={contactNumber} // Bind value to state
            onChange={(e) => setContactNumber(e.target.value)} // Update state on change
            className="w-[75vw] sm:w-full p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white"
          />
          <textarea
            placeholder="Address"
            value={address} // Bind value to state
            onChange={(e) => setAddress(e.target.value)} // Update state on change
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

export default SellerRegister;