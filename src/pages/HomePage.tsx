import { useTranslation } from "react-i18next";
import {
  BannerButton,
  CategoriesButtonListHorizontal,
  CompaniesBanner,
  HomeCategoriesComponent,
  // HomeCategoriesComponent,
  Link,
  MainSlideShow,
  shattibGoldIcon,
  shattibText,
  TitleNumber,
  useApi,
  useState,
} from "..";
import { Category } from "../models/Category";
import { HomeCategorie } from "../models/HomeCategories";
// import { HomeCategorie } from "../models/HomeCategories";

const HomePage = () => {
  const { data: categories } = useApi<Category[]>(
    "SeededValues/Categories",
    "GET"
  );
  const [selectedCategory, setSelectedCategory] = useState<number>(0);
  const { data: homeCategories } = useApi<HomeCategorie[]>(
    selectedCategory != 0
      ? `Products/CatsSubCatsProducts?categoryId=${selectedCategory}`
      : "Products/CatsSubCatsProducts",
    "GET",
    undefined,
    undefined
    // [selectedCategory]
  );
  const { t } = useTranslation();
  return (
    <>
      <Link to={"/contact"}>
        <div className="fixed z-50 bottom-4 left-4 w-20 h-20 bg-indigo-950 rounded-full text-white flex items-center justify-center hover:bg-indigo-700">
          {t("contactUsTxt")}
        </div>
      </Link>
      <div>
        <section className="h-screen">
          <div className="relative h-full pb-32 overflow-hidden">
            <MainSlideShow />

            <div className="absolute top-0 pt-16 ps-32 flex flex-col gap-8 z-20 max-lg:pt-8 max-lg:ps-8">
              <img className="w-64 max-lg:w-48" src={shattibText} />
              <span className="text-3xl text-white font-bold max-lg:text-lg">
                {t("homePageMainSlideShowDescriptionTxt")}
              </span>
            </div>
          </div>
        </section>
        <section className="flex items-center justify-center h-screen">
          <div className="absolute -z-10 h-48 w-full bg-[#D8C05F]" />
          <BannerButton />
        </section>

        <section className="p-8">
          <div className="flex items-center mb-4">
            <img className="me-2 w-16" src={shattibGoldIcon} alt="" />
            {/* <div className="me-2 h-16 w-2 bg-yellow-200" /> */}
            <TitleNumber version={2} subTitle="">
              {t("categoriesTxt")}
            </TitleNumber>
          </div>

          <CategoriesButtonListHorizontal
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          {/* <Rkham />

          <div className="flex items-center justify-between py-8">
            <TitleNumber version={2} subTitle="">
              المنتجات
            </TitleNumber>
          </div>
          <ProductListHorizontal /> */}

          {homeCategories &&
            homeCategories?.map((c) => {
              return (
                <HomeCategoriesComponent
                  key={c.id}
                  categoryId={c.id}
                  categoryName={c.name}
                  subCategories={c.subCategories}
                />
              );
            })}
        </section>

        <CompaniesBanner />
      </div>
    </>
  );
};

export default HomePage;
