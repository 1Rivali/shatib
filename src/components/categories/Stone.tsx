import { CategoryCard, Link, stoneImg01, stoneImg02, stoneImg03 } from "../..";
import { stonesSubCategories } from "../../assets/json/stonesSubCategories";

const Stone = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">حجر الأرضيات</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${stonesSubCategories[0].categoryId}/${stonesSubCategories[0].id}`}
          >
            <CategoryCard img={stoneImg01} num="">
              حجر للأرضيات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${stonesSubCategories[0].categoryId}/${stonesSubCategories[1].id}`}
          >
            <CategoryCard img={stoneImg02} num="">
              حجر للجدران
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${stonesSubCategories[0].categoryId}/${stonesSubCategories[2].id}`}
          >
            <CategoryCard img={stoneImg03} num="">
              حجر للواجهات الخارجية
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Stone;
