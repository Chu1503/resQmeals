import React from "react";

const BuyerRegister = () => {
  return (
    <>
      <div className="h-screen w-screen bg-[#F7D098] flex justify-center items-center">
        <div className="flex flex-col p-10 rounded-lg shadow-xl w-[25vw] bg-[#212121]">
          <h1 className="text-[#F7D098] text-4xl sm:text-5xl tracking-widest mb-5">
            Register 
          </h1>
          <input 
          type = "text"
          placeholder="Name"
          className="w-full p-3 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white resize-white "
          />
          <input
          type = "text"
          placeholder="Contact Number"
          className="w-[75vw] sm:w-full p-3 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white resize-white" 
          />
          <input
          type = "textarea"
          placeholder="Address"
          className="w-[75vw] sm:w-full h-[20vh] p-4 mt-4 mb-4 bg-[#676767] rounded-xl outline-none text-white resize-white" 
          />
          </div>
      </div>
    </>
  );
};

export default BuyerRegister;