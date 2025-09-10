import { useRef, useState } from "react";
import { leftArrowIcon, fourDotsMenu } from "..";
import { Category } from "../models/Category";
import { useTranslation } from "react-i18next";
import { STORAGE_URL } from "../assets/const";

interface CategoriesButtonListHorizontalProps {
  categories: Category[] | null;
  selectedCategory: number;
  setSelectedCategory: (val: number) => void;
}

const CategoriesButtonListHorizontal = ({
  categories,
  setSelectedCategory,
  selectedCategory,
}: CategoriesButtonListHorizontalProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [localCategory, setLocalCategory] = useState<number>(selectedCategory);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };
  const { t } = useTranslation();

  return (
    <div className="relative">
      {/* Left and Right Arrows - Hidden on Mobile */}
      <button
        onClick={scrollLeft}
        className="absolute hidden md:flex items-center justify-center rounded-full w-8 h-8 bg-white shadow-md top-6 right-0"
      >
        <img className="-scale-x-100" src={leftArrowIcon} alt="Scroll Left" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute hidden md:flex items-center justify-center rounded-full w-8 h-8 bg-white shadow-md top-6 left-0"
      >
        <img src={leftArrowIcon} alt="Scroll Right" />
      </button>

      {/* Scrollable Button List */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto whitespace-nowrap no-scrollbar"
      >
        {/* All Categories as circular avatar with icon */}
        <button
          title={t("allCategoriesTxt")}
          onClick={() => {
            setSelectedCategory(0);
            setLocalCategory(0);
          }}
          className="inline-block align-top px-3 pt-3 pb-2 group"
        >
          <div
            className={`mx-auto w-15 h-15 sm:w-[90px] sm:h-[90px] rounded-full overflow-hidden ring-2 transition-all duration-200 ${
              localCategory === 0
                ? "ring-primary"
                : "ring-transparent group-hover:ring-gray-300"
            } shadow-sm bg-gray-100 flex items-center justify-center`}
          >
            <img
              src={fourDotsMenu}
              alt={t("allCategoriesTxt")}
              className="w-6 h-6 sm:w-7 sm:h-7 opacity-80"
            />
          </div>
          <div
            className={`mt-2 text-center text-xs sm:text-sm max-w-[5.5rem] sm:max-w-[6.5rem] truncate ${
              localCategory === 0
                ? "text-primary font-semibold"
                : "text-gray-800"
            }`}
          >
            {t("allCategoriesTxt")}
          </div>
        </button>

        {categories &&
          categories.map((cat) => {
            const isActive = localCategory === cat.id;
            const hasImage = Boolean(cat.imagePath);

            return (
              <button
                key={cat.id}
                title={cat.name}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setLocalCategory(cat.id);
                }}
                className="inline-block align-top px-3 pt-3 pb-2 group"
              >
                <div
                  className={`mx-auto w-15 h-15 sm:w-[90px] sm:h-[90px] rounded-full overflow-hidden ring-2 transition-all duration-200 ${
                    isActive
                      ? "ring-primary"
                      : "ring-transparent group-hover:ring-gray-300"
                  } shadow-sm bg-gray-100`}
                >
                  {hasImage ? (
                    <img
                      src={`${STORAGE_URL}${cat.imagePath}`}
                      alt={cat.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 text-sm font-semibold">
                      {cat.name?.[0] || "?"}
                    </div>
                  )}
                </div>
                <div
                  className={`mt-2 text-center text-xs sm:text-sm max-w-[5.5rem] sm:max-w-[6.5rem] truncate ${
                    isActive ? "text-primary font-semibold" : "text-gray-800"
                  }`}
                >
                  {cat.name}
                </div>
              </button>
            );
          })}
      </div>
    </div>
  );
};

export default CategoriesButtonListHorizontal;
