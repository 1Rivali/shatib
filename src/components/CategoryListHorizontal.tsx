import {
  CategoryCard,
  subCategoryImg01,
  subCategoryImg02,
  subCategoryImg03,
} from "..";

const CategoryListHorizontal = () => {
  return (
    <div className="flex py-4 gap-8 overflow-x-auto whitespace-nowrap no-scrollbar">
      <div>
        <CategoryCard img={subCategoryImg01} num="">
          ألواح خشبية
        </CategoryCard>
      </div>

      <div>
        <CategoryCard img={subCategoryImg02} num="">
          الغراء والترويبة
        </CategoryCard>
      </div>
      <div>
        <CategoryCard img={subCategoryImg03} num="">
          السيليكون واللواصق
        </CategoryCard>
      </div>
      <div>
        <CategoryCard img={subCategoryImg01} num="">
          ألواح خشبية
        </CategoryCard>
      </div>
      <div>
        <CategoryCard img={subCategoryImg02} num="">
          الغراء والترويبة
        </CategoryCard>
      </div>
      <div>
        <CategoryCard img={subCategoryImg03} num="">
          السيليكون واللواصق
        </CategoryCard>
      </div>
    </div>
  );
};

export default CategoryListHorizontal;
