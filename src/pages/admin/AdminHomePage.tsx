import {
  CategoriesButtonListHorizontal,
  PaginationButtons,
  ProductCard,
  useApi,
  useState,
} from "../..";
import { Category } from "../../models/Category";
import { ProductHomePage } from "../../models/Product";

const AdminHomePage = () => {
  const { data: categories } = useApi<Category[]>(
    "SeededValues/Categories",
    "GET"
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const { isLoading, error, data } = useApi<ProductHomePage[]>(
    `Products?categoryId=${selectedCategory}`,
    "GET",
    true,
    false,
    [selectedCategory]
  );

  return (
    <main className="p-main">
      <h1 className="text-4xl font-bold text-primary mb-8">المنتجات</h1>
      <CategoriesButtonListHorizontal
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <div className="flex flex-col items-center">
        <div className="flex flex-wrap mt-8 gap-8">
          {/* TODO DELETE LOOP */}
          {isLoading ? (
            <ProductCard />
          ) : error ? (
            <ProductCard name="حدث خطأ!" />
          ) : data ? (
            data.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.mainImagePath}
                categoryId={product.categoryId!}
              />
            ))
          ) : (
            <ProductCard name=" " />
          )}
        </div>
        <PaginationButtons />
      </div>
    </main>
  );
};

export default AdminHomePage;
