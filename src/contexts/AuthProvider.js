import React, { useState, useEffect, createContext } from "react";
import { getAuth, updateProfile } from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    updateProfile(auth.currentUser, {
      displayName: "Robert Kubica",
      photoURL:
        "https://s9.tvp.pl/images2/9/5/8/uid_9580ceba4e48454e82b9404cfa4d20311552739622405_width_1200_play_0_pos_0_gs_0_height_678_robert-kubica-fot-getty-images.jpg",
    });
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
