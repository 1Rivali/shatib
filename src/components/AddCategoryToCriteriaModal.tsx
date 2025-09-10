import { ButtonGold, closeCircleIcon, useApi, useEffect, useState } from "..";
import { useAddCategoryToCriteriaModal } from "../hooks/useAddCategoryToCriteriaModal";
import { Category } from "../models/Category";

const AddCategoryToCriteriaModal = () => {
  const { isShownCategoryCriteriaModal, setIsShownCategoryCriteriaModal } =
    useAddCategoryToCriteriaModal();
  const { isLoading, error, data } = useApi<Category[]>(
    "SeededValues/Categories"
  );

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>(
    []
  );
  useEffect(() => {
    if (selectedCategories.length > 0) {
      localStorage.setItem(
        "selectedCategories",
        JSON.stringify(selectedCategories)
      );
    }
    if (selectedCategoryNames.length > 0) {
      localStorage.setItem(
        "selectedCategoryNames",
        JSON.stringify(selectedCategoryNames)
      );
    }
  }, [selectedCategories, selectedCategoryNames]);

  const handleCategorySelect = (categoryId: number, categoryName: string) => {
    // Update selected categories and names in the state
    setSelectedCategories((prevSelected) => {
      const updated = prevSelected.includes(categoryId)
        ? prevSelected.filter((id) => id !== categoryId) // Deselect category
        : [...prevSelected, categoryId]; // Select category

      // Update localStorage with the updated selectedCategories
      localStorage.setItem("selectedCategories", JSON.stringify(updated));

      return updated;
    });

    setSelectedCategoryNames((prevNames) => {
      const updated = prevNames.includes(categoryName)
        ? prevNames.filter((name) => name !== categoryName) // Deselect category
        : [...prevNames, categoryName]; // Select category

      // Update localStorage with the updated selectedCategoryNames
      localStorage.setItem("selectedCategoryNames", JSON.stringify(updated));

      return updated;
    });
  };
  if (isShownCategoryCriteriaModal) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return isShownCategoryCriteriaModal ? (
    <div className="fixed z-50 top-0 flex items-center justify-center w-full h-full bg-black bg-opacity-75">
      <div className="hidden lg:flex bg-white rounded-xl flex-col items-center justify-center gap-6 text-center w-full max-w-[70%] mx-4 p-6">
        <section className="py-4  h-content">
          <div className="flex flex-row justify-between">
            <div
              className="cursor-pointer"
              onClick={() => setIsShownCategoryCriteriaModal(false)}
            >
              <img src={closeCircleIcon} alt="" />
            </div>
            <h3 className="text-gray-500 mb-8">حدد التصنيفات التي تبحث عنها</h3>
            <div></div>
          </div>
          <div className="flex flex-wrap gap-8 overflow-x-scroll no-scrollbar max-h-[50vh]">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ!</span>
            ) : data ? (
              data.map((category) => (
                <div
                  key={category.id}
                  onClick={() =>
                    handleCategorySelect(category.id, category.name)
                  }
                  className={`h-36 w-36 rounded-full cursor-pointer m-5 ${
                    selectedCategories.includes(category.id)
                      ? "border-4 border-primary"
                      : "hover:bg-amber-100"
                  }`}
                >
                  <div className="flex rounded-full justify-center items-center h-full overflow-hidden">
                    <img
                      className="w-full h-full object-cover"
                      src={category.imagePath!}
                      alt=""
                    />
                  </div>
                  <div className="py-2">
                    <span>{category.name}</span>
                  </div>
                </div>
              ))
            ) : null}
          </div>
          <div onClick={() => setIsShownCategoryCriteriaModal(false)}>
            <ButtonGold className="mt-5">إضافة</ButtonGold>
          </div>
          {/* <CategoryListHorizontal /> */}
          {/* <CategoryListHorizontal /> */}
        </section>
      </div>
      <div className="flex lg:hidden bg-white rounded-xl flex-col items-center justify-center gap-6 text-center w-full max-w-[95%] mx-auto p-4">
        <section className="w-full ">
          <div className="flex justify-between items-center mb-4">
            <button
              className="p-2"
              onClick={() => setIsShownCategoryCriteriaModal(false)}
            >
              <img src={closeCircleIcon} alt="Close" className="h-6 w-6" />
            </button>
            <h3 className="text-gray-700 text-lg font-semibold">
              حدد التصنيفات التي تبحث عنها
            </h3>
          </div>

          <div className="flex flex-wrap gap-8 overflow-y-auto no-scrollbar max-h-[50vh]">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ!</span>
            ) : data ? (
              data.map((category) => (
                <div
                  key={category.id}
                  onClick={() =>
                    handleCategorySelect(category.id, category.name)
                  }
                  className={`h-24 w-24 rounded-full cursor-pointer gap-xl mb-2 ${
                    selectedCategories.includes(category.id)
                      ? "border-4 border-primary"
                      : "hover:bg-amber-100"
                  }`}
                >
                  <div className="flex rounded-full justify-center items-center h-full overflow-hidden ">
                    <img
                      className="w-full h-full object-cover"
                      src={category.imagePath!}
                      alt={category.name}
                    />
                  </div>
                  <div className="text-sm">
                    <span>{category.name}</span>
                  </div>
                </div>
              ))
            ) : null}
          </div>

          <div className="mt-4">
            <ButtonGold
              className="px-6 py-2"
              onClick={() => setIsShownCategoryCriteriaModal(false)}
            >
              إضافة
            </ButtonGold>
          </div>
        </section>
      </div>
    </div>
  ) : null;
};

export default AddCategoryToCriteriaModal;
