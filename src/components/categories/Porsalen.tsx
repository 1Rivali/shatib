import {
  CategoryCard,
  Link,
  porsalenImg01,
  porsalenImg02,
  porsalenImg03,
  porsalenImg04,
} from "../..";
import { porsalenSubCategories } from "../../assets/json/porsalenSubCategories";

const Porsalen = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">البورسلان</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${porsalenSubCategories[0].categoryId}/${porsalenSubCategories[0].id}`}
          >
            <CategoryCard img={porsalenImg01} num="">
              بورسلان الأرضيات الداخلية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${porsalenSubCategories[0].categoryId}/${porsalenSubCategories[1].id}`}
          >
            <CategoryCard img={porsalenImg02} num="">
              بورسلان الحمامات والمطابخ
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${porsalenSubCategories[0].categoryId}/${porsalenSubCategories[2].id}`}
          >
            <CategoryCard img={porsalenImg03} num="">
              بورسلان الواجهات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${porsalenSubCategories[0].categoryId}/${porsalenSubCategories[3].id}`}
          >
            <CategoryCard img={porsalenImg04} num="">
              بورسلان الأرضيات الخارجية
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Porsalen;
