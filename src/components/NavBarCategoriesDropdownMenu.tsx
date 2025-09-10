import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CatDropdownItem, downArrowIcon, Link, useApi, useState } from "..";
import { HomeCategorie } from "../models/HomeCategories";

const NavBarCategoriesSidebarMenu = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const { t } = useTranslation();
  const { data: categories } = useApi<HomeCategorie[]>(
    "Products/CatsSubCatsProducts",
    "GET"
  );
  // Handle body scroll lock
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isSidebarOpen]);

  if (isSidebarOpen) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }

  return (
    <>
      {/* Trigger Button */}
      <div
        onClick={() => setSidebarOpen(true)}
        className="flex items-center cursor-pointer"
      >
        <span className="px-2">{t("categoriesTxt")}</span>
        <img className="w-4" src={downArrowIcon} alt="Open Sidebar" />
      </div>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="relative w-4/5 max-w-sm h-full bg-white shadow-lg">
            {/* Sidebar Header */}
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">{t("categoriesTxt")}</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Categories and Subcategories */}
            <div className="flex flex-col h-full overflow-y-scroll">
              {/* Categories List */}
              <div className="p-4 mb-10">
                {categories &&
                  categories.map((category) => {
                    console.log(category.name);
                    return (
                      <div key={category.id}>
                        {/* Category Item */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setActiveCategoryId((prev) =>
                              prev === category.id ? null : category.id
                            );
                          }}
                          className={`p-2 cursor-pointer flex justify-between items-center ${
                            activeCategoryId === category.id
                              ? "bg-gray-200 font-bold"
                              : ""
                          }`}
                        >
                          <CatDropdownItem showLeftIcon={false}>
                            {category.name}
                          </CatDropdownItem>
                          <span className="text-gray-500">
                            {activeCategoryId === category.id ? "−" : "+"}
                          </span>
                        </div>

                        {/* Subcategories List */}
                        {activeCategoryId === category.id && (
                          <div className="pl-4 mt-2 border-l bg-gray-200 mb-10">
                            {category.subCategories.length > 0 ? (
                              category.subCategories.map((subCategory) => (
                                <Link
                                  key={subCategory.id}
                                  to={`/category/${category.id}/${subCategory.id}`}
                                  onClick={() => setSidebarOpen(false)} // Close sidebar after selecting
                                >
                                  <CatDropdownItem
                                    className="mr-5"
                                    showLeftIcon={false}
                                  >
                                    {`- ${subCategory.name}`}
                                  </CatDropdownItem>
                                </Link>
                              ))
                            ) : (
                              <div className="text-gray-500">
                                لا يوجد تصنيفات فرعية
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBarCategoriesSidebarMenu;
