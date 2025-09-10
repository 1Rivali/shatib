import {
  CategoriesButtonListHorizontal,
  // HomeCategoriesComponent,
  useApi,
  useState,
} from "../..";
import { Category } from "../../models/Category";
// import { HomeCategorie } from "../../models/HomeCategories";

const AdminCategoriesPage = () => {
  const { data: categories } = useApi<Category[]>(
    "SeededValues/Categories",
    "GET"
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  // const { data: homeCategories } = useApi<HomeCategorie[]>(
  //   selectedCategory != 0
  //     ? `Products/CatsSubCatsProducts?categoryId=${selectedCategory}`
  //     : "Products/CatsSubCatsProducts",
  //   "GET",
  //   undefined,
  //   undefined,
  //   // [selectedCategory]
  // );
  // TODO DELETE
  // const temp = [1, 2];
  return (
    <main>
      <section className="pt-main px-main pb-4">
        <h1 className="text-4xl font-bold text-primary mb-8">التصنيفات</h1>
        <CategoriesButtonListHorizontal
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      <hr />

      <section className="p-main">
        {/* {homeCategories &&
          homeCategories?.map((c) => {
            return (
              <HomeCategoriesComponent
                categoryId={c.id}
                categoryName={c.name}
                subCategories={c.subCategories}
              />
            );
          })} */}
        {/* TODO DELETE LOOP */}
        {/* {temp.map(() => (
          <div className="mb-16">
            <h1 className="text-4xl font-bold text-gray-800 mb-6">الرخام</h1>
            <h2 className="text-4xl font-bold text-gray-500 mb-8">
              التصنيفات الفرعية
            </h2>
            <div className="flex gap-8">
              <Link to={"/admin/category/1"}>
                <CategoryCard img={categoryImg01} num="">
                  رخام الأرضيات الداخلية والخارجية
                </CategoryCard>
              </Link>
              <CategoryCard img={categoryImg02} num="">
                رخام المطابخ والحمامات
              </CategoryCard>
              <CategoryCard img={categoryImg03} num="">
                رخام الجدران
              </CategoryCard>
              <CategoryCard img={categoryImg04} num="">
                رخام الواجهات
              </CategoryCard>
            </div>
          </div>
        ))} */}
      </section>
    </main>
  );
};

export default AdminCategoriesPage;
