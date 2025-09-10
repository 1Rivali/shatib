import {
  MainPadding,
  ProductCard,
  SectionTitles,
  TitleNumber,
  useApi,
  useEffect,
  useLocation,
  useParams,
  useState,
} from "..";
import { STORAGE_URL } from "../assets/const";
import { subCategories } from "../assets/json/subCategories";
import { ProductHomePage } from "../models/Product";

// interface Props {
//   categoryId?: number;
// }

const MainCategoryPage = () => {
  const { id, subId } = useParams();

  const subCategory = subCategories.find(
    (subCategory) =>
      subCategory.id === parseInt(subId || "-1") &&
      subCategory.categoryId === parseInt(id || "-1")
  );

  const [maxPrice, setMaxPrice] = useState(10000);
  const [minPrice, setMinPrice] = useState(0);
  const { isLoading, error, data } = useApi<ProductHomePage[]>(
    subId != null
      ? `Products?categoryId=${id}&subcategoryId=${subId}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      : `Products?categoryId=${id}&minPrice=${minPrice}&maxPrice=${maxPrice}`
  );

  const location = useLocation();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlMinPrice = params.get("minPrice");
    const urlMaxPrice = params.get("maxPrice");
    setMinPrice(parseFloat(urlMinPrice || "0"));
    setMaxPrice(parseFloat(urlMaxPrice || "10000"));
  }, [location.search]);

  return (
    <main>
      <MainPadding>
        <SectionTitles
          title01="الصفحة الرئيسية"
          title01Link="/home"
          title02="التصنيفات"
          title02Link="/home"
          endTitle={subCategory?.name}
        />
        <TitleNumber subTitle="">التصنيفات الفرعية</TitleNumber>
        <TitleNumber subTitle="">{subCategory?.name || "غير محدد"}</TitleNumber>
        {/* <SubCategoriesUnderCategory id={parseInt(id || "-1")} /> */}
        {/* <CategoryListHorizontal /> */}
        {/* <LeftRightButtonsCircle /> */}
        <section className="flex max-lg:flex-col max-lg:w-full">
          <div className="max-lg:w-full max-lg:flex max-lg:flex-col max-lg:items-center">
            {/* <CategoryFilterCard /> */}
          </div>
          <div className="max-lg:w-full max-lg:flex max-lg:flex-col max-lg:items-center">
            {/* <ProductsFilterViewControls /> */}
            <section className="flex flex-wrap gap-8 max-lg:justify-center">
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
                    image={`${STORAGE_URL}${product.mainImagePath}`}
                    price={product.price}
                    categoryId={product.categoryId!}
                  />
                ))
              ) : null}
            </section>
          </div>
        </section>
      </MainPadding>
    </main>
  );
};

export default MainCategoryPage;
