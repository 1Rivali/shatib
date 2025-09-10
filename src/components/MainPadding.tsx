import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

const MainPadding = ({ children }: Props) => {
  return <main className="px-32 py-12 max-lg:p-8">{children}</main>;
};

export default MainPadding;
