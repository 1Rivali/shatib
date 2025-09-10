import React, { createContext, useState, ReactNode } from "react";

// Define the structure of your context props
interface ConfirmDeleteContextProps {
  isShownConfirmDeleteModal: boolean;
  setIsShownConfirmDeleteModal: (isShown: boolean) => void;
  id: number | null;
  setId: (id: number | null) => void;
  endpoint: string;
  setEndpoint: (endpoint: string) => void;
  onConfirm: (() => void) | null; // Add onConfirm function
  setOnConfirm: (onConfirm: (() => void) | null) => void; // Setter for onConfirm
}

interface ConfirmDeleteProviderProps {
  children: ReactNode;
}

// Create the context with default value as undefined
export const ConfirmDeleteContext = createContext<
  ConfirmDeleteContextProps | undefined
>(undefined);

export const ConfirmDeleteProvider: React.FC<ConfirmDeleteProviderProps> = ({
  children,
}) => {
  const [isShownConfirmDeleteModal, setIsShownConfirmDeleteModal] =
    useState(false);
  const [id, setId] = useState<number | null>(null);
  const [endpoint, setEndpoint] = useState<string>("");
  const [onConfirm, setOnConfirm] = useState<(() => void) | null>(null); // New state

  return (
    <ConfirmDeleteContext.Provider
      value={{
        isShownConfirmDeleteModal,
        setIsShownConfirmDeleteModal,
        id,
        setId,
        endpoint,
        setEndpoint,
        onConfirm, // Provide onConfirm
        setOnConfirm, // Provide setter for onConfirm
      }}
    >
      {children}
    </ConfirmDeleteContext.Provider>
  );
};
