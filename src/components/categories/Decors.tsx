import { CategoryCard, decorsImg01, Link } from "../..";
import { decorsSubCategories } from "../../assets/json/decorsSubCategories";

const Decors = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">الديكورات</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${decorsSubCategories[0].categoryId}/${decorsSubCategories[0].id}`}
          >
            <CategoryCard img={decorsImg01} num="">
              القفاري
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Decors;
