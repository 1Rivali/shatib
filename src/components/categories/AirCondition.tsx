import { acImg01, acImg02, acImg03, acImg04, CategoryCard, Link } from "../..";
import { airConditionSubCategories } from "../../assets/json/airConditionSubCategories";

const AirCondition = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">التكييف</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-auto whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${airConditionSubCategories[0].categoryId}/${airConditionSubCategories[0].id}`}
          >
            <CategoryCard img={acImg01} num="">
              مكيفات سبليت
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${airConditionSubCategories[0].categoryId}/${airConditionSubCategories[1].id}`}
          >
            <CategoryCard img={acImg02} num="">
              مكيفات النافذة
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${airConditionSubCategories[0].categoryId}/${airConditionSubCategories[2].id}`}
          >
            <CategoryCard img={acImg03} num="">
              مكيفات مركزية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${airConditionSubCategories[0].categoryId}/${airConditionSubCategories[3].id}`}
          >
            <CategoryCard img={acImg04} num="">
              مكيفات الكاسيت
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AirCondition;
