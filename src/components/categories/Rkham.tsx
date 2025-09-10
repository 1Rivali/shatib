import {
  CategoryCard,
  Link,
  rkahmImg01,
  rkahmImg02,
  rkahmImg03,
  rkahmImg04,
  rkahmImg05,
} from "../..";
import { rkhamSubCategory } from "../../assets/json/rkhamSubCategory";

const Rkham = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">الرخام</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto overflow-y-hidden whitespace-nowrap no-scrollbar">
          <Link
            to={`/category/${rkhamSubCategory[0].categoryId}/${rkhamSubCategory[0].id}`}
          >
            <CategoryCard img={rkahmImg01} num="">
              رخام الأرضيات الداخلية والخارجية
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${rkhamSubCategory[1].categoryId}/${rkhamSubCategory[1].id}`}
          >
            <CategoryCard img={rkahmImg02} num="">
              رخام المطابخ والحمامات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${rkhamSubCategory[2].categoryId}/${rkhamSubCategory[2].id}`}
          >
            <CategoryCard img={rkahmImg03} num="">
              رخام الجدران
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${rkhamSubCategory[3].categoryId}/${rkhamSubCategory[3].id}`}
          >
            <CategoryCard img={rkahmImg04} num="">
              رخام الواجهات
            </CategoryCard>
          </Link>
          <Link
            to={`/category/${rkhamSubCategory[4].categoryId}/${rkhamSubCategory[4].id}`}
          >
            <CategoryCard img={rkahmImg05} num="">
              بديل الرخام
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Rkham;
