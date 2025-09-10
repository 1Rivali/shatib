import { toast } from "react-toastify";
import {
  bluePenIcon,
  Link,
  PaginationButtons,
  // productImg,
  redTrashIcon,
  shattibIcon,
  useApi,
  useState,
} from "../..";
import "../../App.css";
import { useConfirmDelete } from "../../hooks/useConfirmDeleteModal";
import { ProductHomePage } from "../../models/Product";
import { STORAGE_URL } from "../../assets/const";

const AdminProductsPage = () => {
  const [refetchProducts, setRefetchProducts] = useState<number>(0);
  const { isLoading, error, data } = useApi<ProductHomePage[]>(
    "Products",
    "GET",
    true,
    false,
    [refetchProducts]
  );
  const { setIsShownConfirmDeleteModal, setId, setEndpoint, setOnConfirm } =
    useConfirmDelete();
  const onConfirmDelete = () => {
    setRefetchProducts((prev) => (prev += 1));
    toast.success("تم حذف المنتج بنجاح", {
      theme: "colored",
      style: { backgroundColor: "#c18a33" },
      icon: () => <img src={shattibIcon} />,
    });
  };
  // TODO DELETE TEMP
  // const temp = [1, 2, 3, 4, 5];
  return (
    <>
      <main className="p-main">
        <h1 className="text-4xl font-bold text-primary mb-8">قائمة المنتجات</h1>
        <section className="flex flex-col items-center ">
          <table className="admin-product-table">
            <thead>
              <tr>
                <th>رمز التخزين</th>
                <th>المنتج</th>
                <th>التصنيف</th>
                {/* <th>الكمية</th> */}
                <th>السعر</th>
                <th>العمليات</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <span className="text-2xl font-bold">جاري التحميل...</span>
              ) : error ? (
                <span className="text-2xl font-bold text-red-600">
                  حدث خطأ في الاتصال!
                </span>
              ) : data ? (
                data.map((product) => (
                  <tr key={product.id}>
                    <td>{product.warehouseCode}</td>
                    <td>
                      <div className="flex items-center justify-start gap-4 ps-4">
                        <img
                          className=" h-16 aspect-video rounded object-cover"
                          src={`${STORAGE_URL}${product.mainImagePath}`}
                          alt=""
                        />
                        <span>{product.name}</span>
                      </div>
                    </td>
                    <td>{product.subCategoryName}</td>
                    {/* <td>150</td> */}
                    <td>{product.price} ريال</td>
                    <td>
                      <div className="flex items-center justify-center gap-4">
                        <Link to={`/admin/product/edit/${product.id}`}>
                          <img src={bluePenIcon} alt="Edit" />
                        </Link>

                        <button
                          onClick={() => {
                            setId(product.id);
                            setIsShownConfirmDeleteModal(true);
                            setEndpoint("Products");
                            setOnConfirm(() => onConfirmDelete);
                          }}
                        >
                          <img src={redTrashIcon} alt="" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : null}
              {/* TODO DELETE LOOP TEMP */}
              {/* {temp.map(() => (
                <tr>
                  <td>#12345647</td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <img
                        className=" h-16 aspect-video rounded object-cover"
                        src={productImg}
                        alt=""
                      />
                      <span>طقم شطاف WC213</span>
                    </div>
                  </td>
                  <td>مواد الصحية</td>
                  <td>150</td>
                  <td>20 ريال</td>
                  <td>
                    <div className="flex items-center justify-center gap-4">
                      <button>
                        <img src={bluePenIcon} alt="" />
                      </button>
                      <button
                        onClick={() => setIsShownConfirmDeleteModal(true)}
                      >
                        <img src={redTrashIcon} alt="" />
                      </button>
                    </div> 
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>

          <PaginationButtons />
        </section>
      </main>
    </>
  );
};

export default AdminProductsPage;
