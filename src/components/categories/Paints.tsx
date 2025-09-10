import {
  CategoryCard,
  Link,
  paintsImg01,
  paintsImg02,
  paintsImg03,
  paintsImg04,
} from "../..";
import { paintsSubCategories } from "../../assets/json/paintsSubCategories";

const Paints = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">الدهانات</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${paintsSubCategories[0].categoryId}/${paintsSubCategories[0].id}`}
          >
            <CategoryCard img={paintsImg01} num="">
              دهانات الجدران الداخلية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${paintsSubCategories[0].categoryId}/${paintsSubCategories[1].id}`}
          >
            <CategoryCard img={paintsImg02} num="">
              دهانات الجدران الخارجية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${paintsSubCategories[0].categoryId}/${paintsSubCategories[2].id}`}
          >
            <CategoryCard img={paintsImg03} num="">
              الأساسات والمعاجين والمخففات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${paintsSubCategories[0].categoryId}/${paintsSubCategories[3].id}`}
          >
            <CategoryCard img={paintsImg04} num="">
              دهانات الأرضيات
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Paints;
