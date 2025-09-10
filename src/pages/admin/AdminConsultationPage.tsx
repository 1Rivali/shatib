import { useState, useEffect } from "react";
import {
  MainPadding,
  redTrashIcon,
  TitleNumber,
  useApi,
  useParams,
} from "../..";
import { Consultation } from "../../models/Consultation";
import { useConfirmDelete } from "../../hooks/useConfirmDeleteModal";

const AdminConsultationPage = () => {
  const { id } = useParams();

  const { setEndpoint, setId, setIsShownConfirmDeleteModal } =
    useConfirmDelete();
  setEndpoint(`Consultations`);
  setId(parseInt(id || ""));

  const { isLoading, error, data } = useApi<Consultation>(
    `Consultations/${id}`,
    "GET",
    true
  );
  const { patchData } = useApi(
    `Consultations/ChangeStatus/${id}`,
    "PATCH",
    true,
    true
  );

  const [status, setStatus] = useState<string>("Pending");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // Set status when data is loaded
  useEffect(() => {
    if (data) {
      setStatus(data.status || "Pending"); // Update status once data is fetched
    }
  }, [data]); // Runs every time data is fetched

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    setStatus(newStatus);
    try {
      await patchData({
        consultationId: parseInt(id || ""),
        newStatus: newStatus,
      }); // Update the status
    } catch (err) {
      console.error("Error updating status:", err);
      setStatus(data?.status || "Pending"); // Revert to old status in case of error
    }
    setIsUpdating(false);
  };

  return (
    <main>
      <MainPadding>
        {isLoading ? (
          <span>جاري التحميل...</span>
        ) : error ? (
          <span>حدث خطأ!</span>
        ) : data ? (
          <section className="flex justify-between">
            <div className="flex gap-4">
              <div>
                <h1 className="text-2xl font-bold">طلب استشارة رقم #{id}</h1>
                <h2 className="text-gray-500 mt-2">
                  تاريخ الإرسال {data.dateOfRequest.substring(0, 10)}
                </h2>
              </div>

              <div>
                <select
                  value={status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={`bg-gray-100 text-black rounded-full py-1 px-4 font-bold cursor-pointer ${
                    status === "Pending"
                      ? "bg-yellow-100"
                      : status === "Completed"
                      ? "bg-green-100"
                      : ""
                  }`}
                  disabled={isUpdating} // Disable during update
                >
                  <option className="bg-yellow-100" value="Pending">
                    معلّق
                  </option>
                  <option className="bg-green-100" value="Completed">
                    معالج
                  </option>
                </select>
              </div>
            </div>

            <button onClick={() => setIsShownConfirmDeleteModal(true)}>
              <img src={redTrashIcon} alt="Delete" />
            </button>
          </section>
        ) : null}

        <hr className="my-4" />

        <div className="bg-gray-100 p-8 pb-32 rounded">
          <h2 className="text-2xl font-bold">معلومات الطلب</h2>
          <hr className="my-2" />

          <div className="flex gap-2">
            <span className="text-gray-400">اسم مقدم الطلب: </span>
            <h3>{data?.userName || "لايوجد"}</h3>
          </div>

          <hr className="my-2" />

          <div className="flex gap-16">
            <TitleNumber
              column
              inverse
              subTitle={data?.consultationTopic || "لايوجد"}
            >
              موضوع الاستشارة
            </TitleNumber>
            <TitleNumber
              column
              inverse
              subTitle={data?.projectCategory || "لايوجد"}
            >
              نوع المشروع
            </TitleNumber>
            <TitleNumber
              column
              inverse
              subTitle={data?.phoneNumber || "لايوجد"}
            >
              رقم الهاتف
            </TitleNumber>
          </div>

          <h2 className="text-xl text-gray-400">تفاصيل الاستشارة</h2>
          <p className="p-4 text-lg">{data?.details || "لايوجد تفاصيل"}</p>
        </div>
      </MainPadding>
    </main>
  );
};

export default AdminConsultationPage;
