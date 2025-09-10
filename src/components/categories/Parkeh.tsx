import {
  CategoryCard,
  Link,
  parkehImg01,
  parkehImg02,
  parkehImg03,
} from "../..";
import { parkehSubCategories } from "../../assets/json/parkehSubcategories";

const Parkeh = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">الباركيه</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${parkehSubCategories[0].categoryId}/${parkehSubCategories[0].id}`}
          >
            <CategoryCard img={parkehImg01} num="">
              باركيه الأرضيات الداخلية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${parkehSubCategories[0].categoryId}/${parkehSubCategories[1].id}`}
          >
            <CategoryCard img={parkehImg02} num="">
              باركيه مقاوم للرطوبة
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${parkehSubCategories[0].categoryId}/${parkehSubCategories[2].id}`}
          >
            <CategoryCard img={parkehImg03} num="">
              باركيه للأماكن التجارية
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Parkeh;
