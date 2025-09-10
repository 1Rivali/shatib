import {
  DropDownMenuButton,
  MainPadding,
  OrdersTableRow,
  useApi,
  useState,
} from "..";
import { Order } from "../models/Order";

const OrdersPage = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [filter, setFilter] = useState<
    "Pending" | "Accepted" | "Rejected" | "Shipped" | "All" | string
  >("All");
  const { isLoading, error, data } = useApi<Order[]>(
    filter === "All" ? "Orders/User" : `Orders/UserStatus?status=${filter}`,
    "GET",
    true
  );

  return (
    <main>
      <MainPadding>
        <h1 className="text-2xl font-bold">الطلبات</h1>
        <div className="relative flex flex-col items-end w-full mt-6">
          <div onClick={() => setIsDropdown(!isDropdown)} className="w-32 py-4">
            <DropDownMenuButton>
              {filter === "All"
                ? "جميع الطلبات"
                : filter === "Accepted"
                ? "مقبول"
                : filter === "Pending"
                ? "قيد المعالجة"
                : filter === "Rejected"
                ? "مرفوض"
                : filter === "Shipped"
                ? "مكتمل"
                : ""}
            </DropDownMenuButton>
          </div>

          {isDropdown && (
            <div className="absolute top-12 flex flex-col bg-white shadow-xl rounded-lg">
              {[
                { query: "All", arabic: "جميع الطلبات" },
                { query: "Pending", arabic: "قيد المعالجة" },
                { query: "Accepted", arabic: "مقبول" },
                { query: "Rejected", arabic: "مرفوض" },
                { query: "Shipped", arabic: "مكتمل" },
              ].map((status) => (
                <button
                  onClick={() => {
                    setIsDropdown(false);
                    setFilter(status.query);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  {status.arabic}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Desktop Table (Hidden on mobile) */}
        <table className="orders-table w-full hidden lg:table">
          <thead className="bg-gray-100">
            <tr>
              {[
                "رقم الطلب",
                "تاريخ الإنشاء",
                "السعر الكلي",
                "حالة الطلب",
                "تاريخ التنفيذ",
              ].map((item) => (
                <th className="p-4 text-center text-sm font-semibold text-gray-600">
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  جاري التحميل...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="text-center py-4 text-red-500">
                  حدث خطأ!
                </td>
              </tr>
            ) : data ? (
              data.map((order) => (
                <OrdersTableRow
                  user
                  key={order.id}
                  id={order.id}
                  totalPrice={order.totalPrice}
                  orderItems={order.orderItems}
                  dateOfArrival={order.dateOfArrival}
                  dateOfOrder={order.dateOfOrder}
                  status={
                    order.status === "Pending"
                      ? "قيد المعالجة"
                      : order.status === "Accepted"
                      ? "مقبول"
                      : order.status === "Rejected"
                      ? "مرفوض"
                      : order.status === "Shipped"
                      ? "مكتمل"
                      : ""
                  }
                />
              ))
            ) : null}
          </tbody>
        </table>

        {/* Mobile Layout (Table hidden on mobile) */}
        <div className="lg:hidden mt-6 space-y-4">
          {isLoading ? (
            <span className="text-center text-gray-500">جاري التحميل...</span>
          ) : error ? (
            <span className="text-center text-red-500">حدث خطأ!</span>
          ) : (
            data?.map((order) => (
              <div
                key={order.id}
                className="p-4 border rounded-lg shadow-lg bg-white space-y-2 hover:shadow-xl"
              >
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    رقم الطلب:
                  </span>
                  <span className="text-gray-600">{order.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    تاريخ الإنشاء:
                  </span>
                  <span className="text-gray-600">{order.dateOfOrder}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    السعر الكلي:
                  </span>
                  <span className="text-gray-600">{order.totalPrice} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    حالة الطلب:
                  </span>
                  <span>
                    {order.status === "Pending" ? (
                      <span className="bg-yellow-200 text-yellow-700 py-1 px-3 rounded-full text-xs">
                        قيد المعالجة
                      </span>
                    ) : order.status === "Accepted" ? (
                      <span className="bg-green-200 text-green-700 py-1 px-3 rounded-full text-xs">
                        مقبول
                      </span>
                    ) : order.status === "Rejected" ? (
                      <span className="bg-red-200 text-red-700 py-1 px-3 rounded-full text-xs">
                        مرفوض
                      </span>
                    ) : order.status === "Shipped" ? (
                      <span className="bg-blue-200 text-blue-700 py-1 px-3 rounded-full text-xs">
                        مكتمل
                      </span>
                    ) : null}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-700">
                    تاريخ التنفيذ:
                  </span>
                  <span className="text-gray-600">
                    {order.dateOfArrival || "غير محدد"}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </MainPadding>
    </main>
  );
};

export default OrdersPage;
