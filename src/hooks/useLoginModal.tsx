import { useContext } from "react";
import { LoginModalContext } from "../context/LoginModalContext";

export const useLoginModal = () => {
  const context = useContext(LoginModalContext);
  if (!context) {
    throw new Error("useLoginModal must be used within an LoginModalProvider");
  }
  return context;
};
