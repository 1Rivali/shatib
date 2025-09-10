import React, { LazyExoticComponent } from "react";

type LazyComponent = LazyExoticComponent<React.FC<any>>;

type AdminRoute = {
  path: string;
  element: JSX.Element;
};

const AdminHomePage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminHomePage")
);
const AdminProductsPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminProductsPage")
);
const AdminCategoriesPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminCategoriesPage")
);
const AdminCategoryPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminCategoryPage")
);
const AdminOrdersPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminOrdersPage")
);
const AdminOrderPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminOrderPage")
);
const AdminConsultationsPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminConsultationsPage")
);
const AdminConsultationPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminConsultationPage")
);
const StatisticsPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/StatisticsPage")
);
const AdminCriteriasPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminCriteriasPage")
);
const AdminCriteriaPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminCriteriaPage")
);
const AdminSamplesPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminSamplesPage")
);
const AdminCustomMeasuresPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminCustomMeasuresPage")
);
const AdminEditProductPage: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminEditProductPage")
);
const AdminNewProductContainer: LazyComponent = React.lazy(
  () => import("../../pages/admin/AdminNewProductContainer")
);
const AdminRouter: AdminRoute[] = [
  {
    path: "",
    element: <AdminHomePage />,
  },
  {
    path: "products",
    element: <AdminProductsPage />,
  },
  {
    path: "product/new",
    element: <AdminNewProductContainer />,
  },
  {
    path: "product/new/2",
    element: <AdminNewProductContainer />,
  },
  { path: "product/edit/:id", element: <AdminEditProductPage /> },
  {
    path: "categories",
    element: <AdminCategoriesPage />,
  },
  {
    path: "category/:id",
    element: <AdminCategoryPage />,
  },
  {
    path: "orders",
    element: <AdminOrdersPage />,
  },
  {
    path: "order/:id",
    element: <AdminOrderPage />,
  },
  {
    path: "consultations",
    element: <AdminConsultationsPage />,
  },
  {
    path: "consultation/:id",
    element: <AdminConsultationPage />,
  },
  {
    path: "statistics",
    element: <StatisticsPage />,
  },
  {
    path: "criterias",
    element: <AdminCriteriasPage />,
  },
  {
    path: "criterias/:id",
    element: <AdminCriteriaPage />,
  },
  {
    path: "samples",
    element: <AdminSamplesPage />,
  },
  {
    path: "custom-measures",
    element: <AdminCustomMeasuresPage />,
  },
];

export default AdminRouter;
