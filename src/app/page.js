"use client";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Homepage from "./homepage-seller/page";
import SelectPage from "@/app/select/select";
import ParticlesComponent from "@/components/particles/particles";
import "@/components//particles/particles.css";

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // State variable for loading indicator

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false); // Set loading to false once auth state is determined
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

  const isDesktop = window.innerWidth >= 768;

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-[#F7D098] sm:bg-transparent">
      {loading ? (
        <p className="text-[#333333] text-3xl sm:text-5xl font-bold p-5 tracking-widest">
          Loading...
        </p>
      ) : user ? (
        <SelectPage />
      ) : (
        <>
          {isDesktop && <ParticlesComponent id="particles" />}{" "}
          <div className="flex flex-col h-[50vh] w-[50vh] p-10 bg-[#212121] rounded-full align-middle text-center justify-center shadow-lg hover:shadow-xl">
            <div>
              <h1 className="text-[#F7D098] text-3xl sm:text-5xl font-bold p-5 tracking-wide">
                resQmeals
              </h1>
              <button
                onClick={signInWithGoogle}
                className="border-[2px] w-auto rounded-full p-3 font-black tracking-[5px] text-[#333333] border-[#333333] bg-[#F7D098]"
              >
                SIGN IN
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
