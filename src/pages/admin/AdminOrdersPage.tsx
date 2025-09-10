// import { toast } from "react-toastify";
import {
  DropDownMenuButton,
  MainPadding,
  OrdersTableRow,
  // shattibIcon,
  useApi,
  useState,
} from "../..";
import { Order } from "../../models/Order";

const AdminOrdersPage = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [filter, setFilter] = useState<
    "Pending" | "Accepted" | "Rejected" | "Shipped" | "All" | string
  >("All");
  // const [refetchOrders, setRefetchOrders] = useState<number>(0);
  const { isLoading, error, data } = useApi<Order[]>(
    filter === "All" ? "Orders/All" : `Orders/Status?status=${filter}`,
    "GET",
    true,
    false
    // [refetchOrders]
  );

  // const onConfirmDelete = () => {
  //   setRefetchOrders((prev) => (prev += 1));
  //   toast.success("تم حذف الطلب بنجاح", {
  //     theme: "colored",
  //     style: { backgroundColor: "#c18a33" },
  //     icon: () => <img src={shattibIcon} />,
  //   });
  // };

  // Pending // Accepted // Rejected // Shipped
  // TODO DELETE
  // const temp: Array<"قيد المعالجة" | "مقبول" | "مرفوض" | "مكتمل"> = [
  //   "قيد المعالجة",
  //   "مقبول",
  //   "مرفوض",
  //   "مكتمل",
  //   "قيد المعالجة",
  //   "مقبول",
  //   "مرفوض",
  //   "مكتمل",
  // ];
  return (
    <main>
      <MainPadding>
        <h1 className="text-2xl font-bold">الطلبات</h1>
        <div className="relative flex flex-col items-end w-full">
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
            <div className="absolute top-12 flex flex-col bg-white shadow-xl">
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
                  className="px-4 py-1 hover:bg-gray-100"
                >
                  {status.arabic}
                </button>
              ))}
            </div>
          )}
        </div>
        <table className="orders-table">
          <thead>
            <tr>
              <th>رقم الطلب</th>
              <th>تاريخ الإنشاء</th>
              {/* <th>المنتجات</th> */}
              {/* <th>الكمية</th> */}
              <th>السعر الكلي</th>
              <th>حالة الطلب</th>
              <th>تاريخ التنفيذ</th>
              <th>العمليات</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <span>جاري التحميل...</span>
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td>
                  <span>حدث خطأ!</span>
                </td>
              </tr>
            ) : data ? (
              data.map((order) => (
                <OrdersTableRow
                  key={order.id}
                  id={order.id}
                  totalPrice={order.totalPrice}
                  orderItems={order.orderItems}
                  dateOfArrival={order.dateOfArrival}
                  dateOfOrder={order.dateOfOrder}
                  // onConfirmDelete={onConfirmDelete}
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
            {/* TODO DELETE LOOP */}
            {/* {temp.map((item) => (
              <OrdersTableRow status={item} />
            ))} */}
          </tbody>
        </table>
      </MainPadding>
    </main>
  );
};

export default AdminOrdersPage;
