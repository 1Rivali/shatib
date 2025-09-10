import { CategoryCard, Link } from "../..";

const Woods = () => {
  return (
    <section className="pt-16">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">الرخام</h1>
        <h2 className="text-4xl font-bold text-gray-500 mb-8">
          التصنيفات الفرعية
        </h2>
        <div className="flex gap-8 overflow-x-auto whitespace-nowrap no-scrollbar">
          <Link to={"/category"}>
            <CategoryCard img="" num="">
              الصفائح الخشبية
            </CategoryCard>
          </Link>
          <Link to={"/category"}>
            <CategoryCard img="" num="">
              الصفائح الرخامية
            </CategoryCard>
          </Link>
          <Link to={"/category"}>
            <CategoryCard img="" num="">
              الصفائح الطينية
            </CategoryCard>
          </Link>
          <Link to={"/category"}>
            <CategoryCard img="" num="">
              الصفائح الحجرية الطبيعية
            </CategoryCard>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Woods;
