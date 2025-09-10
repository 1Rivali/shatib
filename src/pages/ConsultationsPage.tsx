import { AccentText, MainPadding, useApi } from "..";
import { Consultation } from "../models/Consultation";

const ConsultationsPage = () => {
  const { isLoading, error, data } = useApi<Consultation[]>(
    "Consultations/GetUserConsultations",
    "GET",
    true
  );

  return (
    <main>
      <MainPadding>
        <AccentText>طلبات رفع مساحة</AccentText>
        <div className="overflow-x-auto max-w-full">
          {/* Desktop Table */}
          <table className="orders-table min-w-full bg-white rounded-lg shadow-lg hidden lg:table">
            <thead className="bg-gray-100">
              <tr>
                {[
                  "الرمز",

                  "هاتف",
                  "تفاصيل",
                  "فئة",
                  "الحالة",
                  "تاريخ الطلب",
                ].map((item) => (
                  <th
                    className="p-4 text-center text-sm font-semibold text-gray-600"
                    key={item}
                  >
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="text-center p-4">
                    <span className="text-gray-500">جاري التحميل...</span>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-red-500">
                    حدث خطأ!
                  </td>
                </tr>
              ) : (
                data?.map((consultation) => (
                  <tr
                    key={consultation.id}
                    className="even:bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <td className="p-2 text-center">{consultation.id}</td>
                    {/* <td className="p-2 text-center">
                      {consultation.consultationTopic}
                    </td> */}
                    <td className="p-2 text-center">
                      {consultation.phoneNumber}
                    </td>
                    <td className="p-2 text-center">{consultation.details}</td>
                    <td className="p-2 text-center">
                      {consultation.projectCategory}
                    </td>
                    <td className="p-2 text-center">
                      {consultation.status === "Pending" ? (
                        <div className="bg-yellow-200 text-yellow-700 w-24 lg:w-32 py-1 rounded-full mx-auto text-xs">
                          معلّق
                        </div>
                      ) : consultation.status === "Completed" ? (
                        <div className="bg-green-200 text-green-700 w-24 lg:w-32 py-1 rounded-full mx-auto text-xs">
                          معالج
                        </div>
                      ) : null}
                    </td>
                    <td className="p-2 text-center">
                      {consultation.dateOfRequest.substring(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Mobile Layout */}
          <div className="lg:hidden mt-8 space-y-4">
            {isLoading ? (
              <span>جاري التحميل...</span>
            ) : error ? (
              <span>حدث خطأ!</span>
            ) : (
              data?.map((consultation) => (
                <div
                  key={consultation.id}
                  className="p-4 border rounded-lg shadow-lg bg-white space-y-2 transition-all hover:shadow-xl"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">الرمز:</span>
                    <span className="text-gray-600">{consultation.id}</span>
                  </div>
                  {/* <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      الموضوع:
                    </span>
                    <span className="text-gray-600">
                      {consultation.consultationTopic}
                    </span>
                  </div> */}
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">هاتف:</span>
                    <span className="text-gray-600">
                      {consultation.phoneNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">تفاصيل:</span>
                    <span className="text-gray-600">
                      {consultation.details}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">فئة:</span>
                    <span className="text-gray-600">
                      {consultation.projectCategory}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">الحالة:</span>
                    <span>
                      {consultation.status === "Pending" ? (
                        <span className="bg-yellow-200 text-yellow-700 py-1 px-3 rounded-full text-xs">
                          معلّق
                        </span>
                      ) : consultation.status === "Completed" ? (
                        <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">
                          معالج
                        </span>
                      ) : null}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">
                      تاريخ الطلب:
                    </span>
                    <span className="text-gray-600">
                      {consultation.dateOfRequest.substring(0, 10)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </MainPadding>
    </main>
  );
};

export default ConsultationsPage;
