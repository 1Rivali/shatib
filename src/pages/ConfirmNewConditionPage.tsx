// ConfirmNewConditionPage.tsx
import { useEffect, useState } from "react";
import {
  MainPadding,
  ButtonGold,
  GoldConditionCard,
  plusCircleGoldIcon,
  CriteriaDetailsPopupForm,
  Navigate,
  shattibIcon,
} from "..";
import { PostCirteriaItem, PostCriteria } from "../models/Criteria";
import { usePostCriteria } from "../hooks/usePostCriteria";
import { useAddCategoryToCriteriaModal } from "../hooks/useAddCategoryToCriteriaModal";
import { toast } from "react-toastify";

const ConfirmNewConditionPage = () => {
  const { postData, isLoading, error, data } = usePostCriteria("Criteria");
  const { setIsShownCategoryCriteriaModal, isShownCategoryCriteriaModal } =
    useAddCategoryToCriteriaModal();
  const [popupCategory, setPopupCategory] = useState<number>();

  const [popupShown, setPopupShown] = useState(false);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>(
    []
  );
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<
    Map<number, PostCirteriaItem[]>
  >(new Map());
  const [images, setImages] = useState<File[]>([]); // Store images separately in a list

  useEffect(() => {
    // const criteriaTitle = localStorage.getItem("criteriaTitle");
    const selectedCategories = localStorage.getItem("selectedCategories");
    const selectedCategoryNames = localStorage.getItem("selectedCategoryNames");

    if (selectedCategoryNames) {
      setSelectedCategoryNames(JSON.parse(selectedCategoryNames));
    }

    if (selectedCategories) {
      setSelectedCategories(JSON.parse(selectedCategories));
    }
  }, [isShownCategoryCriteriaModal]);

  // Remove category from state and localStorage
  const removeCategory = (categoryId: number) => {
    // Remove the category from the selectedCategories and selectedCategoryNames states
    const updatedCategories = selectedCategories.filter(
      (id) => id !== categoryId
    );
    const updatedCategoryNames = selectedCategoryNames.filter(
      (_, index) => selectedCategories[index] !== categoryId
    );

    setSelectedCategories(updatedCategories);
    setSelectedCategoryNames(updatedCategoryNames);

    // Update localStorage to reflect the changes
    localStorage.setItem(
      "selectedCategories",
      JSON.stringify(updatedCategories)
    );
    localStorage.setItem(
      "selectedCategoryNames",
      JSON.stringify(updatedCategoryNames)
    );
  };

  const handleAddProduct = (categoryId: number, product: PostCirteriaItem) => {
    setCategoryProducts((prev) => {
      const updatedMap = new Map(prev);
      const existingProducts = updatedMap.get(categoryId) || [];
      updatedMap.set(categoryId, [...existingProducts, product]);
      return updatedMap;
    });
  };

  const handleImageChange = (imageFile: File) => {
    setImages((prevImages) => [...prevImages, imageFile]); // Add image to the list
  };

  const handleSubmit = async () => {
    const criteriaItems: PostCirteriaItem[] = [];

    // Iterate through selected categories and add only those that are still in selectedCategories
    selectedCategories.forEach((categoryId) => {
      // Check if the category is still present in selectedCategories
      if (categoryProducts.has(categoryId)) {
        const categoryData = categoryProducts.get(categoryId) || [];
        categoryData.forEach((product) => {
          criteriaItems.push({
            ...product,
          });
        });
      }
    });
    console.log(localStorage.getItem("criteriaTitle"));
    const postCriteria: PostCriteria = {
      Title: localStorage.getItem("criteriaTitle") || "", // No longer unused
      CriteriaItems: criteriaItems,
    };

    const formData = new FormData();
    formData.append("Title", postCriteria.Title);

    postCriteria.CriteriaItems.forEach((item, index) => {
      if (selectedCategories.includes(item.categoryId)) {
        formData.append(
          `CriteriaItems[${index}].categoryId`,
          JSON.stringify(item.categoryId)
        );
        formData.append(
          `CriteriaItems[${index}].productName`,
          JSON.stringify(item.productName)
        );
        formData.append(
          `CriteriaItems[${index}].description`,
          JSON.stringify(item.description)
        );
        formData.append(
          `CriteriaItems[${index}].amount`,
          JSON.stringify(item.amount)
        );
        formData.append(
          `CriteriaItems[${index}].measurementUnit`,
          JSON.stringify(item.measurementUnit)
        );
        formData.append(`CriteriaItems[${index}].image`, images[index]);
      }
    });

    // Modify each item in CriteriaItems to include the image
    // postCriteria.CriteriaItems.forEach((item, index) => {
    //   const modifiedItem = {
    //     ...item, // Spread the existing item
    //     image: images[index], // Add the corresponding image to each item
    //   };

    //   // Append the modified item as a JSON string
    //   formData.append("CriteriaItems", JSON.stringify(modifiedItem));
    // });

    // formData.append(
    //   "CriteriaItems",
    //   JSON.stringify(postCriteria.CriteriaItems)
    // );

    // formData.append(`images`, images); // Add images directly
    // Attach images separately (not embedded in CriteriaItems)
    // images.forEach((image, index) => {
    // formData.append(`images[${index}]`, image); // Add images directly
    // formData.append(`images`, image); // Add images directly
    // });

    try {
      await postData(formData);
      formData.forEach((i) => console.log(i));
      if (!error) {
        console.log("error", error);
        console.log("CONFIRM NEW PAGE CONDITION", "if state");
        localStorage.removeItem("criteriaTitle");
        localStorage.removeItem("selectedCategories");
        localStorage.removeItem("selectedCategoryNames");
        toast.success("تم إرسال الكراسة بنجاح", {
          theme: "colored",
          style: {
            backgroundColor: "#c18a33",
            fontSize: "16px",
            fontWeight: "bold",
          },
          icon: () => <img src={shattibIcon} />,
        });
      }
      // const response = await fetch("/api/submitCriteria", {
      //   method: "POST",
      //   body: formData,
      // });
      // const result = await response.json();
      // console.log("Submission result:", result);
    } catch (error) {
      console.error("Error submitting criteria:", error);
    }
  };

  return (
    <>
      {data && <Navigate to={"/conditions"} />}
      <CriteriaDetailsPopupForm
        isShown={popupShown}
        setIsShown={setPopupShown}
        categoryId={popupCategory!} // Assuming only one category is selected at a time
        handleAddProduct={handleAddProduct}
        handleImageChange={handleImageChange} // Pass handleImageChange to the form
      />

      <main>
        <MainPadding>
          <h1 className="text-2xl font-bold max-lg:text-center">طرح كراسة</h1>
          <section className="py-8">
            <div className="flex gap-8 max-lg:flex-col max-lg:items-center">
              <h2>التصنيفات المختارة</h2>
              {/* <Link to="/conditions/new"> */}
              <div
                className="flex gap-2 cursor-pointer"
                onClick={() => setIsShownCategoryCriteriaModal(true)}
              >
                <img src={plusCircleGoldIcon} alt="" />
                <span className="text-yellow-600">إضافة المزيد</span>
              </div>
              {/* </Link> */}
            </div>
            <div className="flex gap-4 py-8 max-lg:flex-col max-lg:items-center max-lg:gap-16">
              {selectedCategoryNames.map((name, index) => (
                <div
                  className="p-4 pb-16 border rounded"
                  key={selectedCategories[index]}
                >
                  <GoldConditionCard
                    id={selectedCategories[index]}
                    popupShown={popupShown}
                    setPopupShown={setPopupShown}
                    name={name}
                    removeCategory={removeCategory}
                    setPopupCategory={setPopupCategory}
                  />
                  <div className="mt-16">
                    {categoryProducts
                      .get(selectedCategories[index])
                      ?.map((product, prodIndex) => (
                        <div
                          key={prodIndex}
                          className="p-4 border rounded bg-gray-100"
                        >
                          <h3 className="font">
                            <strong className="text-lg font-bold">
                              اسم المنتج:
                            </strong>{" "}
                            {product.productName}
                          </h3>
                          <p>
                            <strong className="text-lg font-bold">
                              وصف المنتج:
                            </strong>{" "}
                            {product.description}
                          </p>
                          <p>
                            <strong className="text-lg font-bold">
                              الكمية:
                            </strong>{" "}
                            {product.amount}
                          </p>
                          <p>
                            <strong className="text-lg font-bold">
                              وحدة القياس:
                            </strong>{" "}
                            {product.measurementUnit}
                          </p>
                          {/* {images[index] && (
                            <div>
                              <strong>صورة المنتج:</strong>
                              <img
                                src={URL.createObjectURL(images[index])}
                                alt={product.productName}
                                className="mt-2 w-48 h-48 object-cover"
                              />
                            </div>
                          )} */}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
          <div className="flex flex-col w-full py-4">
            <div className="w-48 self-end max-lg:self-center max-lg:w-full">
              <ButtonGold onClick={handleSubmit}>
                {isLoading
                  ? "جاري الإرسال..."
                  : error
                  ? "حدث خطأ!"
                  : "إرسال الكراسة"}
              </ButtonGold>
            </div>
          </div>
        </MainPadding>
      </main>
    </>
  );
};

export default ConfirmNewConditionPage;
