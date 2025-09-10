import { useRef, useState } from "react";
import { RoundButton, leftArrowIcon } from "..";
import { Category } from "../models/Category";
import { useTranslation } from "react-i18next";

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
        className="absolute flex items-center justify-center rounded-full w-8 h-8 bg-white shadow-md top-2 right-0 hidden md:flex"
      >
        <img className="-scale-x-100" src={leftArrowIcon} alt="Scroll Left" />
      </button>
      <button
        onClick={scrollRight}
        className="absolute flex items-center justify-center rounded-full w-8 h-8 bg-white shadow-md top-2 left-0 hidden md:flex"
      >
        <img src={leftArrowIcon} alt="Scroll Right" />
      </button>

      {/* Scrollable Button List */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto whitespace-nowrap no-scrollbar"
      >
        <RoundButton
          onClick={() => {
            setSelectedCategory(0);
            setLocalCategory(0);
          }}
          active={localCategory === 0}
        >
          {t("allCategoriesTxt")}
        </RoundButton>
        {categories &&
          categories.map((cat) => (
            <RoundButton
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setLocalCategory(cat.id);
                // document
                //   .getElementById(`home-cat-${cat.id}`)!
                //   .scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              active={localCategory === cat.id}
            >
              {cat.name}
            </RoundButton>
          ))}
      </div>
    </div>
  );
};

export default CategoriesButtonListHorizontal;
