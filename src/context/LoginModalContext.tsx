import React, { createContext, useState, ReactNode } from "react";

// Define the structure of your context props
interface LoginModalContextProps {
  isShownLoginModal: boolean;
  setIsShownLoginModal: (isShown: boolean) => void;
}

interface LoginModalProviderProps {
  children: ReactNode;
}

// Create the context with default value as undefined
export const LoginModalContext = createContext<
  LoginModalContextProps | undefined
>(undefined);

export const LoginModalProvider: React.FC<LoginModalProviderProps> = ({
  children,
}) => {
  // States to store modal visibility, item ID, and the endpoint
  const [isShownLoginModal, setIsShownLoginModal] = useState(false);

  return (
    <LoginModalContext.Provider
      value={{
        isShownLoginModal,
        setIsShownLoginModal,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};
