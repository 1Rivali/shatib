import { useRef } from "react";
import {
  bathroomImg01,
  bathroomImg02,
  bathroomImg03,
  bathroomImg04,
  bathroomImg05,
  bathroomImg06,
  bathroomImg07,
  bathroomImg08,
  bathroomImg09,
  bathroomImg10,
  bathroomImg11,
  bathroomImg12,
  CategoryCard,
  Link,
  leftArrowIcon,
} from "../..";
import { bathroomSubCategories } from "../../assets/json/bathroomSubCategories";

const Bathroom = () => {
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

  return (
    <section className="pt-16 relative">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          مواد صحية وخزانات
        </h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>

        {/* Left and Right Arrows */}
        <div className="absolute z-10 -right-4 top-[65%] flex justify-between w-full">
          <button
            onClick={scrollLeft}
            className="flex items-center justify-center rounded-full w-12 h-12 bg-white shadow-xl"
          >
            <img
              className="-scale-x-100"
              src={leftArrowIcon}
              alt="Scroll Left"
            />
          </button>
          <button
            onClick={scrollRight}
            className="flex items-center justify-center rounded-full w-12 h-12 bg-white shadow-xl"
          >
            <img src={leftArrowIcon} alt="Scroll Right" />
          </button>
        </div>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto whitespace-nowrap no-scrollbar"
        >
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[0].id}`}
          >
            <CategoryCard img={bathroomImg01} num="">
              الخلاطات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[1].id}`}
          >
            <CategoryCard img={bathroomImg02} num="">
              كراسي الحمامات والسيفونات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[2].id}`}
          >
            <CategoryCard img={bathroomImg03} num="">
              السخانات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[3].id}`}
          >
            <CategoryCard img={bathroomImg04} num="">
              أحواض الاستحمام
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[4].id}`}
          >
            <CategoryCard img={bathroomImg05} num="">
              أنظمة الدش
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[5].id}`}
          >
            <CategoryCard img={bathroomImg06} num="">
              خارج مياه للدش
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[6].id}`}
          >
            <CategoryCard img={bathroomImg07} num="">
              الشطافات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[7].id}`}
          >
            <CategoryCard img={bathroomImg08} num="">
              لوازم السباكة
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[8].id}`}
          >
            <CategoryCard img={bathroomImg09} num="">
              لوازم السباكة
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[9].id}`}
          >
            <CategoryCard img={bathroomImg10} num="">
              مغاسل الحمام
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[10].id}`}
          >
            <CategoryCard img={bathroomImg11} num="">
              خزانات المياه
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${bathroomSubCategories[0].categoryId}/${bathroomSubCategories[11].id}`}
          >
            <CategoryCard img={bathroomImg12} num="">
              ملحقات الحمام
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bathroom;
