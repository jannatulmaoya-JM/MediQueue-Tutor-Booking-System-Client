import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const register = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const googleLogin = () => signInWithPopup(auth, googleProvider);

  const logout = () => signOut(auth);

  const updateUserProfile = (name, photoURL) =>
    updateProfile(auth.currentUser, { displayName: name, photoURL });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // JWT token
        try {
          const res = await axios.post(
            `${import.meta.env.VITE_API_URL}/jwt`,
            { email: currentUser.email },
            { withCredentials: true }
          );
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/logout`,
            {},
            { withCredentials: true }
          );
        } catch (err) {}
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = { user, loading, register, login, googleLogin, logout, updateUserProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};