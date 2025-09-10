// import { useTranslation } from "react-i18next";
import { Link, CategoryCard } from "../..";
import { HomeSubCategory } from "../../models/HomeCategories";
import { STORAGE_URL } from "../../assets/const";

interface HomeCategoriesComponentProps {
  subCategories: HomeSubCategory[];
  categoryName: string;
  categoryId: number;
}

const HomeCategoriesComponent = ({
  subCategories,
  categoryName,
  categoryId,
}: HomeCategoriesComponentProps) => {
  // const { t } = useTranslation();
  return (
    <section id={`home-cat-${categoryId}`} className="pt-16 relative">
      <div className="mb-16">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          {categoryName}
        </h1>
        {/* <h2 className="text-4xl font-bold text-gray-500 mb-8">
          {t("subCategoriesTxt")}
        </h2> */}

        {/* Sub-categories using the old card style */}
        <div className="grid gap-y-2 gap-x-0.5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {subCategories.map((sc) => (
            <Link
              key={sc.id}
              to={`/category/${categoryId}/${sc.id}`}
              className="block"
              title={sc.name}
            >
              <CategoryCard img={`${STORAGE_URL}${sc.imagePath}`} num="">
                {sc.name}
              </CategoryCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeCategoriesComponent;
