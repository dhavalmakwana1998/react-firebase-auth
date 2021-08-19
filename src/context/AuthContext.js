import React, { createContext, useState, useEffect, useContext } from "react";
import { auth } from "../firebase";

const AuthContex = createContext();

export function useAuth() {
  return useContext(AuthContex);
}

const AuthProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState();

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }
  function logout() {
    return auth.signOut();
  }
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }
  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updatePassword,
  };

  return <AuthContex.Provider value={value}>{children}</AuthContex.Provider>;
};
export default AuthProvider;
