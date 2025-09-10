import {
  CategoryCard,
  Link,
  panelsImg01,
  panelsImg02,
  panelsImg03,
  panelsImg04,
} from "../..";
import { panelsSubCategories } from "../../assets/json/panelsSubCategories";

const Panels = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          الصفائح الحجرية
        </h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${panelsSubCategories[0].categoryId}/${panelsSubCategories[0].id}`}
          >
            <CategoryCard img={panelsImg01} num="">
              الصفائح الخشبية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${panelsSubCategories[0].categoryId}/${panelsSubCategories[1].id}`}
          >
            <CategoryCard img={panelsImg02} num="">
              الصفائح الرخامية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${panelsSubCategories[0].categoryId}/${panelsSubCategories[2].id}`}
          >
            <CategoryCard img={panelsImg03} num="">
              الصفائح الطينية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${panelsSubCategories[0].categoryId}/${panelsSubCategories[3].id}`}
          >
            <CategoryCard img={panelsImg04} num="">
              الصفائح الحجرية الطبيعية
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Panels;
