import { useEffect, useState } from "react";
import {
  ButtonGold,
  downArrowIcon,
  TitleNumber,
  UploadFile,
  useApi,
  useParams,
} from "../..";
import { Cirteria } from "../../models/Criteria";

const AdminCriteriaPage = () => {
  const { id } = useParams();
  const [refetchData, setRefetchData] = useState<number>(0);
  const { isLoading, error, data } = useApi<Cirteria>(
    `Criteria/${id}`,
    "GET",
    true,
    false,
    [refetchData]
  );

  const [status, setStatus] = useState<string>(data?.status || "Pending"); // Set the initial status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [invoiceImage, setInvoiceImage] = useState<File | null>(null);
  function handleInvoiceImg(image: File) {
    setInvoiceImage(() => image);
  }
  // Function to handle status update
  const { patchData } = useApi(`Criteria/${id}/Status`, "PATCH", true);
  // const { postData: postCriteriaBill } = useApi(
  //   "CriteriaBills",
  //   "POST",
  //   true,
  //   true,
  //   []
  // );
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus); // Update local status
    patchData({ id: id, status: newStatus }); // Send patch request to update status
    setIsDropdownOpen(false); // Close the dropdown after selecting a status
  };

  useEffect(() => {
    if (data) {
      setStatus(data.status); // Initialize status when data is fetched
    }
  }, [data]);

  const uploadInvoice = async () => {
    if (!invoiceImage || !data) return;

    const formData = new FormData();
    formData.append("CriteriaId", data.id.toString());
    formData.append("Image", invoiceImage);

    try {
      const response = await fetch(`http://www.ouzon.somee.com/api/CriteriaBills`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to upload invoice");
      }

      console.log("Invoice uploaded successfully!");
      setRefetchData((prev) => (prev += 1));
      setInvoiceImage(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="p-main mb-5">
      {isLoading ? (
        <span>جاري التحميل...</span>
      ) : error ? (
        <span>حدث خطأ!</span>
      ) : data ? (
        <section>
          <div className="flex justify-between">
            <div>
              <div className="flex gap-4">
                <h1 className="text-2xl font-bold">كراسة رقم #{data.id}</h1>
                <div className="relative">
                  {/* Dropdown Button */}
                  <div
                    className={`flex gap-4 rounded-full py-1 px-4 cursor-pointer ${status === "Pending"
                        ? "bg-yellow-100"
                        : status === "Rejected"
                          ? "bg-red-100"
                          : status === "Accepted"
                            ? "bg-green-100"
                            : ""
                      }`}
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span>
                      {status === "Pending"
                        ? "قيد المعالجة"
                        : status === "Rejected"
                          ? "مرفوضة"
                          : "مقبولة"}
                    </span>
                    <img className="w-3" src={downArrowIcon} alt="dropdown" />
                  </div>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-0 right-0 mt-2 w-32 bg-white shadow-md rounded-lg">
                      <ul className="text-sm">
                        {["Pending", "Rejected", "Accepted"].map(
                          (statusOption) => (
                            <li
                              key={statusOption}
                              className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                              onClick={() => updateStatus(statusOption)}
                            >
                              {statusOption === "Pending"
                                ? "قيد المعالجة"
                                : statusOption === "Rejected"
                                  ? "مرفوضة"
                                  : "مقبولة"}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-gray-500">15/10/2024</h3>
            </div>
          </div>
          <hr />
          <TitleNumber inverse subTitle={data.title}>
            عنوان الكراسة
          </TitleNumber>
          <TitleNumber
            inverse
            subTitle={data.displayName ? data.displayName : "لايوجد"}
          >
            اسم الزبون
          </TitleNumber>
          <TitleNumber inverse subTitle={data.phoneNumber}>
            رقم الهاتف
          </TitleNumber>
          <h2 className="text-xl font-bold">محتوى الكراسة:</h2>
          <div className="rounded bg-gray-100">
            {data.criteriaItems.map((criteriaItem) => (
              <div className="flex p-8" key={criteriaItem.productName}>
                <div className="w-2/3 p-8">
                  <TitleNumber inverse subTitle={criteriaItem.categoryName}>
                    التصنيف
                  </TitleNumber>
                  <div className="flex gap-6">
                    <TitleNumber
                      inverse
                      column
                      subTitle={criteriaItem.productName}
                    >
                      اسم المنتج
                    </TitleNumber>
                    <TitleNumber
                      inverse
                      column
                      subTitle={`${criteriaItem.amount}`}
                    >
                      الكمية
                    </TitleNumber>
                    <TitleNumber
                      inverse
                      column
                      subTitle={criteriaItem.measurementUnit}
                    >
                      وحدة القياس
                    </TitleNumber>
                  </div>
                  <div>
                    <h3 className="text-gray-500">وصف المنتج</h3>
                    <p>{criteriaItem.description}</p>
                  </div>
                </div>

                <div className="w-1/3 p-8">
                  <h3>المرفقات</h3>
                  <div className="w-64 aspect-video">
                    {criteriaItem.image.toLowerCase().endsWith(".pdf") ? (
                      <>
                        {" "}
                        <iframe
                          src={criteriaItem.image}
                          title="PDF Viewer"
                          className="w-[100%] h-full"
                        />
                        <ButtonGold
                          className="mt-3"
                          onClick={() => {
                            window.open(
                              criteriaItem.image,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }}
                        >
                          فتح الملف
                        </ButtonGold>
                      </>
                    ) : (
                      <img
                        className="w-full h-full object-cover"
                        src={criteriaItem.image}
                        alt="attachment"
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of the sections remain the same */}
          <section className="flex justify-between p-8">
            {data.invoices.length > 0 ? (
              <div>
                <h3 className="text-3xl font-bold text-center mb-5">
                  فاتورة الكراسة
                </h3>
                {data.invoices[0].image.endsWith(".pdf") ? (
                  <>
                    <iframe
                      src={data.invoices[0].image}
                      title="PDF Viewer"
                      className="w-[100%] h-full"
                    />
                    <ButtonGold
                      className="mt-3"
                      onClick={() => {
                        window.open(
                          data.invoices[0].image,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      فتح الملف
                    </ButtonGold>
                  </>
                ) : (
                  <img
                    src={data.invoices[0].image}
                    alt="وصل الدفع"
                    className="w-[400px] h-[400px] object-cover"
                  />
                )}
              </div>
            ) : (
              <div>
                <div className="flex gap-2 items-center">
                  <div className="w-[450px] h-[250px] px-16">
                    <UploadFile
                      containImg
                      title="صورة الفاتورة"
                      subTitle="أضف صورة الفاتورة للزبون"
                      onImageChange={handleInvoiceImg}
                    />

                    <div className="w-44 mt-10 max-lg:w-full">
                      <ButtonGold onClick={uploadInvoice}>
                        رفع الفاتورة
                      </ButtonGold>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-center mb-5">
                وصل الدفع من الزبون
              </h1>
              {data && data.invoices.length > 0 && data.invoices[0].receipt ? (
                data.invoices[0].receipt
                  .toLocaleLowerCase()
                  .endsWith(".pdf") ? (
                  <>
                    {" "}
                    <iframe
                      src={data.invoices[0].receipt}
                      title="PDF Viewer"
                      className="w-[100%] h-full"
                    />
                    <ButtonGold
                      className="mt-3"
                      onClick={() => {
                        window.open(
                          data.invoices[0].receipt,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      فتح الملف
                    </ButtonGold>
                  </>
                ) : (
                  <img
                    className="w-[350px] h-[350px] object-contain border border-primary rounded-2xl p-5"
                    src={data.invoices[0].receipt}
                    alt="وصل الدفع"
                  />
                )
              ) : (
                <div className="h-full flex justify-center items-center">
                  <h2 className="text-2xl text-center">لم يتم الدفع بعد</h2>
                </div>
              )}
            </div>
          </section>

          <hr />

          {/* <section className="flex flex-col gap-8 w-full py-4">
            <h2 className="text-xl from-black">التعليقات</h2>
            <div>
              <div className="w-2/3 rounded-t-xl border">
                {data.comments.map((comment) => (
                  <CommentItem key={comment.id} message={comment.message} />
                ))}
              </div>
              <div className="flex flex-col w-2/3 rounded-b-xl border p-4 gap-2">
                <form
                  onSubmit={(e) => {
                    // TODO: IMPLEMENT ME
                    e.preventDefault();
                  }}
                >
                  <div className="flex gap-2">
                    <div className="w-full">
                      <TextInput big placeholder="أضف تعليق" />
                    </div>
                    <label htmlFor="attachment" className="cursor-pointer">
                      <img src={attachmentIcon} alt="attachment" />
                      <input id="attachment" type="file" className="hidden" />
                    </label>
                  </div>
                  <div className="w-20 self-end py-4">
                    <ButtonGold>إرسال</ButtonGold>
                  </div>
                </form>
              </div>
            </div>
          </section> */}
        </section>
      ) : null}
    </main>
  );
};

export default AdminCriteriaPage;

// async () => {
//   const formData = new FormData();
//   formData.append("CriteriaId", data.id.toString());
//   if (invoiceImage != null) {
//     formData.append("Image", invoiceImage);
//     console.log(
//       "FormData entries:",
//       Array.from(formData.entries())
//     );
//     await postCriteriaBill(formData);
//     setInvoiceImage(null);
//   }
// }
