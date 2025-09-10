// CriteriaDetailsPopupForm.tsx
import { useEffect, useState } from "react";
import { ButtonGold, closeCircleIcon, TextInput, UploadFile } from "..";
import { PostCirteriaItem } from "../models/Criteria";

interface Props {
  isShown: boolean;
  setIsShown: (isShown: boolean) => void;
  categoryId: number;
  handleAddProduct: (categoryId: number, product: PostCirteriaItem) => void;
  handleImageChange: (image: File) => void; // Pass handleImageChange function
}

const CriteriaDetailsPopupForm = ({
  isShown,
  setIsShown,
  categoryId,
  handleAddProduct,
  handleImageChange,
}: Props) => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [measurementUnit, setMeasurementUnit] = useState("");
  useEffect(() => {
    if (isShown) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isShown]);

  const handleSubmit = () => {
    const newProduct: PostCirteriaItem = {
      categoryId,
      productName,
      description,
      amount,
      measurementUnit,
    };
    handleAddProduct(categoryId, newProduct);
    setIsShown(false); // Close the popup after adding the product

    // reset fields
    setProductName("");
    setDescription("");
    setAmount(0);
    setMeasurementUnit("");
  };

  const isFormValid = () => {
    return (
      productName !== "" &&
      description !== "" &&
      amount !== 0 &&
      measurementUnit !== ""
    );
  };
  return (
    isShown && (
      <div className="absolute z-50 top-0 w-full h-full bg-black bg-opacity-25">
        <div className="rounded-xl flex flex-col justify-between w-5/6 h-5/6 bg-white mx-auto mt-4 p-8">
          <div className="w-full flex items-start justify-between">
            <h1 className="text-4xl font-bold">إضافة المنتج</h1>
            <button onClick={() => setIsShown(false)}>
              <img src={closeCircleIcon} alt="Close" />
            </button>
          </div>

          <div className="flex gap-4">
            <div className="w-full">
              <TextInput
                blackTitle
                title="اسم المنتج"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="أدخل اسم المنتج"
              />
            </div>
            <div className="w-full">
              <TextInput
                blackTitle
                title="الكمية"
                value={amount.toString()}
                number
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="أدخل الكمية"
              />
            </div>
            <div className="w-full">
              <TextInput
                blackTitle
                title="واحدة القياس"
                value={measurementUnit}
                onChange={(e) => setMeasurementUnit(e.target.value)}
                placeholder="أدخل الوحدة"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-2/3">
              <TextInput
                big
                blackTitle
                title="وصف المنتج"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="أدخل معلومات ووصف للمنتج"
              />
            </div>
            <div className="w-1/3 h-[250px] px-16">
              <UploadFile
                containImg
                title="صورة المتنج"
                subTitle="إضف صورة المنتج"
                onImageChange={handleImageChange}
              />
            </div>
          </div>

          <div className="w-36 self-end">
            <ButtonGold disabled={!isFormValid()} onClick={handleSubmit}>
              تأكيد
            </ButtonGold>
          </div>
        </div>
      </div>
    )
  );
};

export default CriteriaDetailsPopupForm;
