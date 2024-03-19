"use client";
import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";

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
    await signOut(auth);
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-blue-500">
      <h1 className="text-white text-3xl sm:text-5xl font-bold p-5">HOMEPAGE</h1>
      <button onClick={logOut}>LOG OUT</button>
    </div>
  );
};

export default Homepage;