import { CategoryCard, doorsImg01, doorsImg02, doorsImg03, Link } from "../..";
import { doorsSubCategories } from "../../assets/json/doorsSubCategories";

const Doors = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">الأبواب</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${doorsSubCategories[0].categoryId}/${doorsSubCategories[0].id}`}
          >
            <CategoryCard img={doorsImg01} num="">
              الأبواب الداخلية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${doorsSubCategories[0].categoryId}/${doorsSubCategories[1].id}`}
          >
            <CategoryCard img={doorsImg02} num="">
              الأبواب الخارجية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${doorsSubCategories[0].categoryId}/${doorsSubCategories[2].id}`}
          >
            <CategoryCard img={doorsImg03} num="">
              أبواب الحمامات والمطابخ
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Doors;
