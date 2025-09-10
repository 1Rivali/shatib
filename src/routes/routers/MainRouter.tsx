import React, { LazyExoticComponent } from "react";

type LazyComponent = LazyExoticComponent<React.FC<any>>;

type MainPagesRouter = {
  path: string;
  element: JSX.Element;
};

const HomePage: LazyComponent = React.lazy(
  () => import("../../pages/HomePage")
);
const ProductPage: LazyComponent = React.lazy(
  () => import("../../pages/ProductPage")
);
const MainCategoryPage: LazyComponent = React.lazy(
  () => import("../../pages/MainCategoryPage")
);
const CartPageContainer: LazyComponent = React.lazy(
  () => import("../../pages/CartPageContainer")
);
const WishListPage: LazyComponent = React.lazy(
  () => import("../../pages/WishListPage")
);
const ConditionDocsPage: LazyComponent = React.lazy(
  () => import("../../pages/ConditionDocsPage")
);
const DocPage: LazyComponent = React.lazy(() => import("../../pages/DocPage"));
const NewConditionPage: LazyComponent = React.lazy(
  () => import("../../pages/NewConditionPage")
);
const ConfirmNewConditionPage: LazyComponent = React.lazy(
  () => import("../../pages/ConfirmNewConditionPage")
);
const PriceRequestPage: LazyComponent = React.lazy(
  () => import("../../pages/PriceRequestPage")
);
const PriceRequestSecondPage: LazyComponent = React.lazy(
  () => import("../../pages/PriceRequestSecondPage")
);
const SearchPage: LazyComponent = React.lazy(
  () => import("../../pages/SearchPage")
);
const OrdersPage: LazyComponent = React.lazy(
  () => import("../../pages/OrdersPage")
);
const OrderPage: LazyComponent = React.lazy(
  () => import("../../pages/OrderPage")
);
const ConsultationsPage: LazyComponent = React.lazy(
  () => import("../../pages/ConsultationsPage")
);

const MainPagesRouter: MainPagesRouter[] = [
  {
    path: "/home",
    element: <HomePage />,
  },
  {
    path: "/product/:id",
    element: <ProductPage />,
  },
  {
    path: "/category/:id/:subId",
    element: <MainCategoryPage />,
  },
  {
    path: "/cart",
    element: <CartPageContainer />,
  },
  {
    path: "/wishlist",
    element: <WishListPage />,
  },
  {
    path: "/conditions",
    element: <ConditionDocsPage />,
  },
  {
    path: "/conditions/doc/:id",
    element: <DocPage />,
  },
  {
    path: "/conditions/new",
    element: <NewConditionPage />,
  },
  {
    path: "/conditions/new/confirm",
    element: <ConfirmNewConditionPage />,
  },
  {
    path: "/price-request",
    element: <PriceRequestPage />,
  },
  {
    path: "/price-request-2",
    element: <PriceRequestSecondPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/orders",
    element: <OrdersPage />,
  },
  {
    path: "/order/:id",
    element: <OrderPage />,
  },
  {
    path: "/consultations",
    element: <ConsultationsPage />,
  },
];

export default MainPagesRouter;
