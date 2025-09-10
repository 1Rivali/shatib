import { Link, MainPadding, useApi, useLocation } from "..";
import { ProductHomePage } from "../models/Product";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");

  const { isLoading, error, data } = useApi<ProductHomePage[]>(
    `Products?searchTerm=${searchQuery}`
  );
  return (
    <main>
      <MainPadding>
        <section className="flex flex-col items-center gap-4 w-3/4 mx-auto">
          <div className="shadow-xl bg-white w-full p-4">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ!</span>
            ) : data ? (
              data.map((product) => (
                <>
                  <Link to={`/product/${product.id}`}>
                    <div className="flex p-4 gap-4">
                      <div className="w-24 h-24">
                        <img src={product.mainImagePath} alt="" />
                      </div>
                      <div className="flex flex-col justify-center gap-2">
                        <span className="text-lg">{product.name}</span>
                        <span className="text-lg font-bold">
                          {product.price} ريال
                        </span>
                      </div>
                    </div>
                  </Link>

                  <hr />
                </>
              ))
            ) : null}
          </div>
        </section>
      </MainPadding>
    </main>
  );
};

export default SearchPage;
