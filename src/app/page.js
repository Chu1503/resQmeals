"use client";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Homepage from "./homepage/page";
import ParticlesComponent from "@/components/particles";
import "@/components/particles.css";

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function to avoid memory leaks
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      {user ? (
        <Homepage />
      ) : (
        <>
          <ParticlesComponent
            id="particles"
            className="z-negative-one h-full w-full absolute inset-0"
          />
          <h1 className="text-white text-3xl sm:text-5xl font-bold p-5">
            ResQMeals
          </h1>
          <button onClick={signInWithGoogle}>SIGN IN</button>
        </>
      )}
    </div>
  );
}
