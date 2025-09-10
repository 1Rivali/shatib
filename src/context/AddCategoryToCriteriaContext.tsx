import React, { createContext, useState, ReactNode } from "react";

// Define the structure of your context props
interface AddCategoryToCriteriaContextProps {
  isShownCategoryCriteriaModal: boolean;
  setIsShownCategoryCriteriaModal: (isShown: boolean) => void;
}

interface AddCategoryToCriteriaProviderProps {
  children: ReactNode;
}

// Create the context with default value as undefined
export const AddCategoryToCriteriaContext = createContext<
  AddCategoryToCriteriaContextProps | undefined
>(undefined);

export const AddCategoryToCriteriaProvider: React.FC<
  AddCategoryToCriteriaProviderProps
> = ({ children }) => {
  // States to store modal visibility, item ID, and the endpoint
  const [isShownCategoryCriteriaModal, setIsShownCategoryCriteriaModal] =
    useState(false);

  return (
    <AddCategoryToCriteriaContext.Provider
      value={{
        isShownCategoryCriteriaModal,
        setIsShownCategoryCriteriaModal,
      }}
    >
      {children}
    </AddCategoryToCriteriaContext.Provider>
  );
};
