import { useState } from "react";
import { useLocation } from "react-router-dom";
import AdminNewProductPage from "./AdminNewProductPage";
import AdminNewProductSecondPage from "./AdminNewProductSecondPage";
import { ColorPost, MeasurementPost } from "../../models/Product";

export interface MyFormData {
  SubCategoryId: number;
  Name: string;
  Description: string;
  Price: number;
  MeasurementUnit: string;
  Measurements: MeasurementPost[];
  ManufacturingCountry: string;
  Colors: ColorPost[];
  Deaf: string;
  RetrivalAndReplacing: string;
  Notes: string;
  WareHouseCode: string;
  Brand: string;
  Keywords: string;
  InstallationTeam: number;
  Specifications: {
    name: string;
    value: string;
  };
  Images?: File[];
}

const AdminNewProductContainer: React.FC = () => {
  const [formData, setFormData] = useState<MyFormData>({
    SubCategoryId: 1,
    Name: "",
    Description: "",
    Keywords: "",
    Price: 0.0,
    MeasurementUnit: "",
    Measurements: [],
    ManufacturingCountry: "",
    Colors: [],
    Deaf: "",
    RetrivalAndReplacing: "",
    Notes: "",
    WareHouseCode: "",
    Brand: "",
    InstallationTeam: 0.0,
    Specifications: { name: "", value: "" },
  });

  const location = useLocation();
  const isSecondPage = location.pathname === "/admin/product/new/2";

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    // Ensure Price is a positive number
    if (name === "Price" && value !== "") {
      // Validate if the price is a positive number
      if (isNaN(Number(value)) || Number(value) <= 0) {
        return; // Do not update state if price is not a positive number
      }
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      SubCategoryId: value,
    }));
  };

  return (
    <>
      {isSecondPage ? (
        <AdminNewProductSecondPage
          formData={formData}
          onInputChange={handleInputChange}
          setFormData={setFormData}
        />
      ) : (
        <AdminNewProductPage
          formData={formData}
          onInputChange={handleInputChange}
          handleSelectChange={handleSelectChange}
          setFormData={setFormData}
        />
      )}
    </>
  );
};

export default AdminNewProductContainer;
