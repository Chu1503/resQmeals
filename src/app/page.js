"use client";
import React, { useState, useEffect } from "react";
import Homepage from "./homepage/page";

export default function Home() {
  

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-red-500">
      <h1 className="text-white text-3xl sm:text-5xl font-bold p-5">ResQMeals</h1>
      {user ? <Homepage /> : <button onClick={handleClick}>SIGN IN</button>}
    </div>
  );
}