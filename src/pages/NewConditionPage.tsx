import { useState, useEffect } from "react";
import {
  acImg01,
  acImg04,
  bathroomImg01,
  ButtonGold,
  CategoryCard,
  decorsImg01,
  doorsImg01,
  edoorsImg01,
  gypsumImg01,
  insulationImg01,
  // CategoryListHorizontal,
  // Link,
  MainPadding,
  nwafezImg01,
  paintsImg01,
  panelsImg01,
  parkehImg01,
  porsalenImg01,
  rkahmImg01,
  shattibIcon,
  siramikImg01,
  stoneImg01,
  switchesImg01,
  TextInput,
  useApi,
} from "..";
import { Category } from "../models/Category";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewConditionPage = () => {
  const categoryImgs = [
    rkahmImg01,
    porsalenImg01,
    siramikImg01,
    parkehImg01,
    nwafezImg01,
    decorsImg01,
    doorsImg01,
    panelsImg01,
    gypsumImg01,
    stoneImg01,
    paintsImg01,
    insulationImg01,
    edoorsImg01,
    switchesImg01,
    bathroomImg01,
    acImg01,
    acImg04,
  ];

  const { isLoading, error, data } = useApi<Category[]>(
    "SeededValues/Categories"
  );

  const [criteriaTitle, setCriteriaTitle] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedCategoryNames, setSelectedCategoryNames] = useState<string[]>(
    []
  );
  const navigate = useNavigate();
  // Save to localStorage whenever the criteriaTitle, selectedCategories, or selectedCategoryNames change
  useEffect(() => {
    if (criteriaTitle) {
      localStorage.setItem("criteriaTitle", criteriaTitle);
    }
  }, [criteriaTitle]);

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

  // Retrieve from localStorage on initial load
  useEffect(() => {
    const savedTitle = localStorage.getItem("criteriaTitle");
    const savedCategories = localStorage.getItem("selectedCategories");
    const savedCategoryNames = localStorage.getItem("selectedCategoryNames");

    if (savedTitle) {
      setCriteriaTitle(savedTitle);
    }

    if (savedCategories) {
      setSelectedCategories(JSON.parse(savedCategories));
    }

    if (savedCategoryNames) {
      setSelectedCategoryNames(JSON.parse(savedCategoryNames));
    }
  }, []);

  return (
    <main id="criteriaTitle">
      <MainPadding>
        <div>
          <h1 className="text-2xl font-bold">طرح كراسة</h1>
          <section className="py-8">
            <h2 className="text-xl">عنوان الكراسة</h2>
            <div className="w-1/2 max-lg:w-full">
              <TextInput
                bordered
                value={criteriaTitle}
                onChange={(e) => setCriteriaTitle(e.target.value)}
                placeholder="أدخل عنوان الكراسة"
              />
            </div>
          </section>
        </div>
        <h2 className="text-xl">التصنيفات</h2>
        <section className="py-4 overflow-hidden">
          <h3 className="text-gray-500 mb-8">حدد التصنيفات التي تبحث عنها</h3>
          <div className="flex flex-wrap gap-8">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ!</span>
            ) : data ? (
              data.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  id={category.id}
                  img={categoryImgs[index]}
                  onClick={() =>
                    handleCategorySelect(category.id, category.name)
                  }
                  selected={selectedCategories.includes(category.id)}
                >
                  {category.name}
                </CategoryCard>
              ))
            ) : null}
          </div>
          {/* <CategoryListHorizontal /> */}
          {/* <CategoryListHorizontal /> */}
        </section>
        <div className="flex flex-col w-full">
          <div
            className="w-32 self-end max-lg:w-full max-lg:self-center"
            onClick={() => {
              if (criteriaTitle === null || criteriaTitle.trim() === "") {
                toast.error("يرجى إدخال عنوان للكراسة", {
                  theme: "colored",
                  // style: { backgroundColor: "#c18a33" },
                  icon: () => <img src={shattibIcon} />,
                });
                document
                  .getElementById("criteriaTitle")!
                  .scrollIntoView({ behavior: "smooth" });
              } else {
                navigate("confirm");
              }
            }}
          >
            {/* <Link to="confirm"> */}
            <ButtonGold
            // disabled={criteriaTitle === null || criteriaTitle.trim() === ""}
            >
              التالي
            </ButtonGold>
            {/* </Link> */}
          </div>
        </div>
      </MainPadding>
    </main>
  );
};

export default NewConditionPage;
