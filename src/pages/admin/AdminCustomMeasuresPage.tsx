import { AccentText, useApi } from "../..";
import { CustomMeasure } from "../../models/CustomMeasure";

const AdminCustomMeasuresPage = () => {
  const { isLoading, error, data } = useApi<CustomMeasure[]>(
    "SpecifiedMeasurements",
    "GET",
    true
  );
  console.log(data);
  return (
    <main className="p-main">
      <AccentText>طلبات قياس مخصص</AccentText>
      {/* <h1 className="text-2xl font-bold mb-8">الاستشارات</h1> */}
      <table className="mt-8 orders-table">
        <thead>
          <tr>
            <th>الرمز</th>
            <th>الصورة</th>
            <th>الطول</th>
            <th>العرض</th>
            <th>تفاصيل</th>
            <th>رقم الهاتف</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <span>جاري التحميل...</span>
          ) : error ? (
            <span>حدث خطأ!</span>
          ) : (
            data?.map((customMeasure) => (
              <tr key={customMeasure.id}>
                <td>{customMeasure.id}</td>
                <td>
                  <div className="flex items-center justify-center">
                    <img
                      className=" h-24 aspect-video rounded object-cover border"
                      src={customMeasure.imagePath}
                      alt=""
                    />
                  </div>
                </td>
                <td>{customMeasure.height}</td>
                <td>{customMeasure.width}</td>
                <td>{customMeasure.details}</td>
                <td>{customMeasure.phoneNumber}</td>
                {/* <td>{customMeasure.userId}</td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* <ul>
          {data?.map((consultation) => (
            <div className="flex gap-2">
              <div>{consultation.id}</div>
              <div>{consultation.consultationTopic}</div>
              <div>{consultation.status}</div>
              <div>{consultation.engineerSpecification}</div>
              <div>{consultation.projectCategory}</div>
              <div>{consultation.phoneNumber}</div>
              <div>{consultation.dateOfRequest}</div>
              <div>{consultation.details}</div>
              <div>{consultation.userId}</div>
            </div>
          ))}
        </ul> */}
    </main>
  );
};

export default AdminCustomMeasuresPage;
