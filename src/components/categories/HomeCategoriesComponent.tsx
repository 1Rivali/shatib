import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { CategoryCard, leftArrowIcon, Link } from "../..";
import { HomeSubCategory } from "../../models/HomeCategories";

interface HomeCategoriesComponentProps {
  subCategories: HomeSubCategory[];
  categoryName: string;
  categoryId: number;
}

const HomeCategoriesComponent = ({
  subCategories,
  categoryName,
  categoryId,
}: HomeCategoriesComponentProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
    <section id={`home-cat-${categoryId}`} className="pt-16 relative">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {categoryName}
        </h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          {t("subCategoriesTxt")}
        </h2>

        {/* Left and Right Arrows - Hidden on Mobile */}
        <button
          onClick={scrollLeft}
          className="absolute  right-0 top-[65%] z-10 flex items-center justify-center rounded-full w-12 h-12 bg-white shadow-4xl hidden md:flex"
        >
          <img className="-scale-x-100" src={leftArrowIcon} alt="Scroll Left" />
        </button>
        <button
          onClick={scrollRight}
          className="absolute  left-0 top-[65%] z-10 flex items-center justify-center rounded-full w-12 h-12 bg-white shadow-xl hidden md:flex"
        >
          <img src={leftArrowIcon} alt="Scroll Right" />
        </button>
        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="relative flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar"
        >
          {subCategories.map((sc) => {
            return (
              <Link key={sc.id} to={`/category/${categoryId}/${sc.id}`}>
                <CategoryCard img={sc.imagePath} num="">
                  {sc.name}
                </CategoryCard>
              </Link>
            );
          })}
          {/* {categoryId === 1 && (
            <div
              onClick={() => {
                setIsShownRkahmCustomMeasureModal(true);
                console.log(isShownRkahmCustomMeasureModal);
              }}
              className="w-15 h-15 flex items-center justify-center cursor-pointer"
            >
              <ButtonGold>طلب قياس مخصص</ButtonGold>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default HomeCategoriesComponent;
