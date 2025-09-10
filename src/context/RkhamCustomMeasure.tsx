import React, { createContext, useState, ReactNode } from "react";

interface RkhamCustomMeasureProps {
  isShownRkahmCustomMeasureModal: boolean;
  setIsShownRkahmCustomMeasureModal: (isShown: boolean) => void;
}

interface RkahmCustomMeasureProviderProps {
  children: ReactNode;
}

export const RkhamCustomMeasure = createContext<
  RkhamCustomMeasureProps | undefined
>(undefined);

export const RkahmCustomMeasureProvider: React.FC<
  RkahmCustomMeasureProviderProps
> = ({ children }) => {
  const [isShownRkahmCustomMeasureModal, setIsShownRkahmCustomMeasureModal] =
    useState(false);

  return (
    <RkhamCustomMeasure.Provider
      value={{
        isShownRkahmCustomMeasureModal,
        setIsShownRkahmCustomMeasureModal,
      }}
    >
      {children}
    </RkhamCustomMeasure.Provider>
  );
};
