"use client";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase/config";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import Homepage from "./homepage/page";
import SelectPage from "@/components/select";
import ParticlesComponent from "@/components/particles/particles";
import "@/components//particles/particles.css";

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
        <SelectPage />
      ) : (
        <>
          <ParticlesComponent id="particles" />
          <h1 className="text-white text-3xl sm:text-5xl font-bold p-5 tracking-widest">
            resQmeals
          </h1>
          <button
            onClick={signInWithGoogle}
            className="border-[2px] rounded-full p-3 font-black tracking-[5px] text-yellow-400 border-yellow-400 bg-black hover:bg-yellow-400 hover:text-black"
          >
            SIGN IN
          </button>
        </>
      )}
    </div>
  );
}


// "use client";
// import React, { useState, useEffect } from "react";
// import { auth } from "./firebase/config";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import Homepage from "./homepage/page";
// import SelectPage from "@/components/select";
// import ParticlesComponent from "@/components/particles/particles";
// import "@/components/particles/particles.css";

// export default function Home() {
//   const [user, setUser] = useState(null);
//   const [firstTimeLogin, setFirstTimeLogin] = useState(true); // State to track first-time login

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       if (user) {
//         setUser(user);
//         setFirstTimeLogin(false); // Set firstTimeLogin to false when user is logged in
//       } else {
//         setUser(null);
//       }
//     });

//     return () => unsubscribe(); // Cleanup function to avoid memory leaks
//   }, []);

//   const signInWithGoogle = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       await signInWithPopup(auth, provider);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="h-screen w-screen flex flex-col justify-center items-center">
//       {user ? (
//         firstTimeLogin ? <SelectPage /> : <Homepage />
//       ) : (
//         <>
//           <ParticlesComponent id="particles" />
//           <h1 className="text-white text-3xl sm:text-5xl font-bold p-5 tracking-widest">
//             resQmeals
//           </h1>
//           <button
//             onClick={signInWithGoogle}
//             className="border-[2px] rounded-full p-3 font-black tracking-[5px] text-yellow-400 border-yellow-400 bg-black hover:bg-yellow-400 hover:text-black"
//           >
//             SIGN IN
//           </button>
//         </>
//       )}
//     </div>
//   );
// }