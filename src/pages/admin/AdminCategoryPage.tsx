import { categoryImg01, PaginationButtons, ProductCard } from "../..";
import SectionTitles from "../../components/SectionTitles";

const AdminCategoryPage = () => {
  // TODO DELETE
  const temp = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  return (
    <main className="p-main">
      <div className="text-2xl mb-8">
        <SectionTitles
          title01="الرخام"
          endTitle="رخام الأرضيات الداخلية والخارجية"
        />
      </div>

      <div className="w-full h-72 rounded-xl overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={categoryImg01}
          alt=""
        />
      </div>

      <div className="mt-8">
        <h2 className="text-2xl text-gray-500 mb-4">المتنجات</h2>
        <div className="flex flex-col items-center">
          <div className="flex flex-wrap gap-8">
            {
              // TODO DELETE LOOP
              temp.map(() => (
                <ProductCard />
              ))
            }
          </div>
          <PaginationButtons />
        </div>
      </div>
    </main>
  );
};

export default AdminCategoryPage;
