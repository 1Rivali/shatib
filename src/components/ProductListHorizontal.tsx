import { useRef } from "react";
import { leftArrowIcon, ProductCard, useApi } from "..";
import { ProductHomePage } from "../models/Product";
import { STORAGE_URL } from "../assets/const";

const ProductListHorizontal = () => {
  const { isLoading, error, data } = useApi<ProductHomePage[]>("Products");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <div className="hidden lg:flex absolute z-10 -right-4 top-36  justify-between w-full">
        <button
          onClick={scrollLeft}
          className="hidden lg:flex items-center justify-center rounded-full w-12 h-12 bg-white shadow-xl"
        >
          <img className="-scale-x-100" src={leftArrowIcon} alt="Scroll Left" />
        </button>
        <button
          onClick={scrollRight}
          className="hidden lg:flex items-center justify-center rounded-full w-12 h-12 bg-white shadow-xl"
        >
          <img src={leftArrowIcon} alt="Scroll Right" />
        </button>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex py-4 gap-8 overflow-x-auto whitespace-nowrap no-scrollbar"
      >
        {isLoading ? (
          <ProductCard />
        ) : error ? (
          <>
            <ProductCard />
          </>
        ) : data ? (
          data.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                image={`${STORAGE_URL}${product.mainImagePath}`}
                categoryId={product.categoryId!}
              />
            </div>
          ))
        ) : (
          <ProductCard />
        )}
      </div>
    </div>
  );
};

export default ProductListHorizontal;
