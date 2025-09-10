import { useContext } from "react";
import { AddCategoryToCriteriaContext } from "../context/AddCategoryToCriteriaContext";

export const useAddCategoryToCriteriaModal = () => {
  const context = useContext(AddCategoryToCriteriaContext);
  if (!context) {
    throw new Error(
      "useAddCategoryToCriteriaModal must be used within an AddCategoryToCriteriaContext"
    );
  }
  return context;
};
