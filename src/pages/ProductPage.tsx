import {
  ProductListHorizontal,
  ProductDetailsCard,
  MainPadding,
  useApi,
  useParams,
  SectionTitles,
  docIcon,
  purpleParagraphIcon,
} from "..";

import { Product } from "../models/Product";
import { useState } from "react";

const ColoredIcon = ({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <span
    role="img"
    aria-label={alt}
    className={`inline-block bg-primary ${className}`}
    style={{
      WebkitMaskImage: `url(${src})`,
      maskImage: `url(${src})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
    }}
  />
);

const ProductPage = () => {
  const { id } = useParams();
  const { isLoading, error, data } = useApi<Product>(`Products/${id}`);
  const [isDescriptionOpen, setDescriptionOpen] = useState(false);
  const [isVerificationOpen, setVerificationOpen] = useState(false);

  const toggleDescription = () => {
    setDescriptionOpen(!isDescriptionOpen);
  };
  const toggleVerification = () => {
    setVerificationOpen(!isVerificationOpen);
  };

  const SkeletonProductDetails = () => (
    <div className="w-full flex flex-col gap-8">
      <div className="animate-pulse max-lg:hidden flex justify-between rounded-xl w-5/6 bg-gray-100">
        <div className="flex flex-col justify-between gap-6 w-3/4 m-8">
          <div className="h-6 w-2/3 bg-gray-300 rounded" />
          <div className="h-4 w-1/3 bg-gray-300 rounded" />
          <div className="h-10 w-28 bg-gray-300 rounded" />
          <div className="h-32 w-full bg-gray-200 rounded" />
          <div className="h-10 w-40 bg-gray-300 rounded" />
        </div>
        <div className="w-full m-8">
          <div className="h-[500px] w-full bg-gray-200 rounded-xl" />
          <div className="flex gap-3 mt-7">
            <div className="h-24 w-24 bg-gray-200 rounded-xl" />
            <div className="h-24 w-24 bg-gray-200 rounded-xl" />
            <div className="h-24 w-24 bg-gray-200 rounded-xl" />
          </div>
        </div>
      </div>
      <div className="animate-pulse lg:hidden flex flex-col rounded-xl w-full bg-gray-100 p-4">
        <div className="h-6 w-2/3 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-1/3 bg-gray-300 rounded mb-6" />
        <div className="h-64 w-full bg-gray-200 rounded-xl mb-6" />
        <div className="flex gap-4">
          <div className="h-16 w-16 bg-gray-200 rounded-xl" />
          <div className="h-16 w-16 bg-gray-200 rounded-xl" />
          <div className="h-16 w-16 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );

  return (
    <main>
      <MainPadding>
        <div className="mt-6">
          <SectionTitles
            title01="الرئيسية"
            title01Link="/"
            endTitle={data?.name || "تفاصيل المنتج"}
          />
        </div>

        <section className="flex justify-center items-center my-10">
          {isLoading ? (
            <SkeletonProductDetails />
          ) : error ? (
            <div className="w-full max-w-3xl p-6 rounded-xl bg-red-50 text-red-800 border border-red-200 text-center">
              حدث خطأ أثناء تحميل بيانات المنتج. يرجى المحاولة لاحقًا.
            </div>
          ) : data ? (
            <ProductDetailsCard data={data} />
          ) : null}
        </section>

        <section className="flex flex-col gap-6 py-6">
          <div className="rounded-xl border border-gray-200 bg-white">
            <button
              onClick={toggleVerification}
              aria-expanded={isVerificationOpen}
              className="w-full flex items-center justify-between text-right px-6 py-4"
            >
              <span className="text-2xl font-bold max-lg:text-xl flex items-center gap-2">
                <ColoredIcon src={docIcon} alt="سياسة" className="w-6 h-6" />
                سياسة الاسترجاع و الاستبدال
              </span>
              <span
                className={`transition-transform ${
                  isVerificationOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {isVerificationOpen && (
              <div className="px-6 pb-6">
                <p className="text-xl leading-8 max-lg:text-lg text-gray-700">
                  {data?.retrivalAndReplacing ||
                    "لا توجد سياسة متاحة لهذا المنتج"}
                </p>
              </div>
            )}
          </div>

          <div className="rounded-xl border border-gray-200 bg-white">
            <button
              onClick={toggleDescription}
              aria-expanded={isDescriptionOpen}
              className="w-full flex items-center justify-between text-right px-6 py-4"
            >
              <span className="text-2xl font-bold max-lg:text-xl flex items-center gap-2">
                <ColoredIcon
                  src={purpleParagraphIcon}
                  alt="الوصف"
                  className="w-6 h-6"
                />
                الوصف
              </span>
              <span
                className={`transition-transform ${
                  isDescriptionOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {isDescriptionOpen && (
              <div className="px-6 pb-6">
                <p className="text-xl leading-8 max-lg:text-lg text-gray-700">
                  {data?.description || "لا يوجد وصف متاح لهذا المنتج"}
                </p>
              </div>
            )}
          </div>
        </section>

        <section className="py-8">
          <h1 className="text-3xl font-bold mb-6">منتجات متشابهة</h1>
          <ProductListHorizontal />
          {/* <LeftRightButtonsCircle /> */}
        </section>
      </MainPadding>
    </main>
  );
};

export default ProductPage;
