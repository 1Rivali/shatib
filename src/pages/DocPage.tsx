import {
  ButtonGold,
  MainPadding,
  SectionTitles,
  UploadFile,
  useApi,
  useParams,
  useState,
} from "..";
import { PdfHandler } from "../components/PdfHandler";
import { CirteriaGet } from "../models/Criteria";

const DocPage = () => {
  // const [commentsRefetch, setCommentsRefetch] = useState(0);
  // const [lastCommentId] = useState(0);
  // const [lastCommentId, setLastCommentId] = useState(0);

  // const [isUploadReceiptShown, setIsUploadReceiptShown] = useState(false);
  const [refetchData, setRefetchData] = useState<number>(0);
  const { id } = useParams();

  const { data } = useApi<CirteriaGet>(`Criteria/${id}`, "GET", true, true, [
    refetchData,
  ]);
  const { patchForm: acceptBill } = useApi(
    data && data?.invoices.length > 0
      ? `CriteriaBills/${data?.invoices[0].id}/Accepted`
      : `CriteriaBills/0/Accepted`,
    "PATCH",
    true,
    true
  );

  const receiptForm = new FormData();
  const { patchForm: uploadReceipt } = useApi(
    data && data.invoices.length > 0
      ? `CriteriaBills/${data.invoices[0].id}/Receipt`
      : `CriteriaBills/0/Receipt`,
    "PATCH",
    true,
    true
  );
  // const { data: comments } = useApi<
  //   {
  //     id: number;
  //     userId: string;
  //     message: string;
  //     attachment: string;
  //   }[]
  // >(
  //   `Criterias/${id}/Comments?lastCommentId=${lastCommentId}`,
  //   "GET",
  //   true,
  //   false,
  //   [commentsRefetch]
  // );
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const handleReceiptImageChange = (file: File) => {
    setReceiptImage(file);
  };
  const handleReceiptSubmit = async () => {
    if (receiptImage) {
      receiptForm.append("Receipt", receiptImage);
    }
    if (id) {
      receiptForm.append("id", id);
    }
    uploadReceipt(receiptForm).then(() => {
      setTimeout(() => {
        setRefetchData((prev) => (prev += 1));
      }, 500);
    });
  };

  // const { postData: postComment } = usePostComment(`Criterias/${id}/Comments`); // custom hook to handle API request
  // const [message, setMessage] = useState("");
  // const [file, setFile] = useState<File | null>(null);

  // const handleMessageChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   setMessage(e.target.value);
  // };

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files ? e.target.files[0] : null;
  //   if (file) {
  //     setFile(file);
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const formData = new FormData();
  //   formData.append("message", message);
  //   if (file) {
  //     formData.append("attachment", file);
  //   }

  //   try {
  //     console.log("doc page formdata");
  //     formData.forEach((i) => console.log(i));
  //     await postComment(formData); // Post the data including the file
  //     setMessage(""); // Clear the input field after submission
  //     setFile(null); // Clear the file input
  //   } catch (error) {
  //     console.error("Error posting comment:", error);
  //   } finally {
  //     setCommentsRefetch((prev) => (prev += 1));
  //   }
  // };

  // const { isLoading, error, data } = useApi<Comment[]>(
  //   `Criterias/${id}/Comments`
  // );
  // TODO DELETE
  // const temp = [1, 2];

  // const category = subCategories.find(
  //   (subCategory) =>
  //     subCategory.categoryId === data?.criteriaItems[0].categoryId
  // );

  return (
    <main>
      <MainPadding>
        <div className="border-b-2 w-fit mb-8">
          <SectionTitles
            title01="كراسات شروط"
            title01Link="/conditions"
            endTitle={`كراسة ${data && data.title}`}
          />
        </div>

        <section className="flex flex-col lg:flex-row items-center gap-10">
          {/* First Section */}
          <section className="flex flex-col gap-8 w-full lg:w-1/2 items-center lg:items-start">
            <h1 className="text-2xl font-bold text-center lg:text-left">
              كراسة {data && data.title}
            </h1>
            <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
              <div className="flex gap-2">
                <span className="font-bold">الحالة</span>
                <span className="font-bold">
                  {data?.status === "Pending" ? (
                    <span className="text-yellow-600">قيد المعالجة</span>
                  ) : data?.status === "Rejected" ? (
                    <span className="text-red-600">مرفوضة</span>
                  ) : data?.status === "Accepted" ? (
                    <span className="text-green-600">مقبولة</span>
                  ) : null}
                </span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-center lg:text-left">
              المرفقات
            </h2>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              {data?.criteriaItems.map((item, index) => (
                <div
                  key={index}
                  className="rounded-xl w-full lg:w-auto border border-primary p-5"
                >
                  <PdfHandler
                    fileClassName="w-[260px] h-[180px]"
                    file={item.image}
                  />
                  <div className="p-4 border rounded bg-gray-100">
                    <h3>
                      <strong className="text-lg font-bold">اسم المنتج:</strong>
                      {item.productName}
                    </h3>
                    <p>
                      <strong className="text-lg font-bold">الكمية:</strong>
                      {item.amount}
                    </p>
                    <p>
                      <strong className="text-lg font-bold">
                        وحدة القياس:
                      </strong>
                      {item.measurementUnit}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Second Section */}
          <section className="flex flex-col items-center gap-8 w-full lg:w-1/2">
            <h2 className="text-xl font-bold text-center">الفاتورة</h2>
            {data && data!.invoices.length > 0 ? (
              <div className="flex flex-col gap-4 items-center">
                <PdfHandler
                  fileClassName="w-[300px] h-[220px]"
                  file={data?.invoices[0].image}
                />
                {data.invoices[0].accepted === null && (
                  <div className="flex gap-2 self-center">
                    <button
                      onClick={() => {
                        const formdata = new FormData();
                        formdata.append("Accepted", "false");
                        acceptBill(formdata).then(() => {
                          setTimeout(() => {
                            setRefetchData((prev) => (prev += 1));
                          }, 500);
                        });
                      }}
                      className="w-20 py-1 rounded bg-gray-200"
                    >
                      رفض
                    </button>
                    <button
                      onClick={() => {
                        const formdata = new FormData();
                        formdata.append("Accepted", "true");
                        acceptBill(formdata).then(() => {
                          setTimeout(() => {
                            setRefetchData((prev) => (prev += 1));
                          }, 500);
                        });
                      }}
                      className="w-20 py-1 rounded bg-green-600 text-white"
                    >
                      قبول
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <center className="w-full">
                <span className="font-bold text-2xl">لا توجد فاتورة بعد</span>
              </center>
            )}
          </section>
        </section>

        <hr className="my-12" />
        <h1 className="text-center w-full text-2xl font-bold mb-5">
          وصل الدفع
        </h1>
        <section className="flex flex-col items-center gap-8 w-full lg:w-full">
          {data &&
            data.invoices.length > 0 &&
            data.invoices[0].accepted &&
            !data.invoices[0].receipt && (
              <section className="flex flex-col items-center gap-8 w-96 h-96">
                <UploadFile
                  title=""
                  subTitle="أضف صورة الفاتورة"
                  onImageChange={handleReceiptImageChange}
                  containImg={true}
                />
                <div onClick={handleReceiptSubmit} className="w-4/5 ">
                  <ButtonGold>إرسال</ButtonGold>
                </div>
              </section>
            )}

          {data && data.invoices.length > 0 && data.invoices[0].receipt && (
            <div className="rounded-xl lg:w-1/3">
              <PdfHandler
                fileClassName="w-full h-[350px]"
                file={data.invoices[0].receipt}
              />
            </div>
          )}
        </section>
      </MainPadding>
    </main>
  );
};

export default DocPage;

// {data && data.invoices.length > 0 && !data.invoices[0].accepted && (
//   <section className="flex flex-col gap-8 w-full">
//     <h2 className="text-xl from-black">التعليقات</h2>
//     <div>
//       <div className="w-2/3 rounded-t-xl border max-h-[350px] overflow-scroll no-scrollbar">
//         {isLoading ? (
//           <span>جاري التحميل...</span>
//         ) : error ? (
//           <span>حدث خطأ!</span>
//         ) : data ? (
//           <></>
//         ) : null}
//         {comments &&
//           comments.map((comment) => (
//             /* Comment */
//             <div className="flex flex-col gap-4 p-8 ">
//               {/* Profile Pic - Name - Date */}
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-gray-200" />
//                 <div className="flex flex-col">
//                   <span className="text-lg">مدير الموقع</span>
//                   {/* <span className="text-s text-gray-400">
//                 قبل 10 دقائق
//               </span> */}
//                 </div>
//               </div>
//               <p>{comment.message}</p>
//             </div>
//           ))}
//       </div>
//       <div className="flex flex-col w-2/3 rounded-b-xl border p-4 gap-2">
//         <form onSubmit={handleSubmit}>
//           <div className="flex gap-2">
//             <div className="w-full">
//               <TextInput
//                 value={message}
//                 onChange={handleMessageChange}
//                 big
//                 placeholder="أضف تعليق"
//               />
//             </div>
//             <label htmlFor="attachment" className="cursor-pointer">
//               <img src={attachmentIcon} alt="attachment" />
//               <input
//                 id="attachment"
//                 type="file"
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//             </label>
//           </div>
//           <div className="w-20 self-end mt-4">
//             <ButtonGold onClick={handleSubmit}>إرسال</ButtonGold>
//           </div>
//         </form>
//       </div>
//     </div>
//   </section>
// )}
