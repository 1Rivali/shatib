import { Link } from "..";
import { Cirteria } from "../models/Criteria";
import { PdfHandler } from "./PdfHandler";

interface Props {
  id?: number;
  status?: "Pending" | "Accepted" | "Rejected" | string;
  criteria?: Cirteria;
  image?: string; // URL of the image or PDF
}

const ConditionCard = ({ id = 0, status, criteria, image }: Props) => {
  if (criteria) {
    id = criteria.id;
  }

  return (
    <Link to={`doc/${id}`}>
      <div className="w-72 h-72 flex flex-col justify-between rounded-xl bg-gray-100 shadow p-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold self-center">{criteria?.title}</h1>
          <hr />
          <div className="flex justify-center">
            <div className="flex gap-2">
              <span>الحالة</span>
              <span
                className={
                  status === "Pending"
                    ? "font-bold text-blue-600"
                    : status === "Accepted"
                    ? "font-bold text-green-600"
                    : status === "Rejected"
                    ? "font-bold text-red-600"
                    : "font-bold"
                }
              >
                {status === "Pending"
                  ? "معلًقة"
                  : status === "Accepted"
                  ? "مقبولة"
                  : status === "Rejected"
                  ? "مرفوضة"
                  : ""}
              </span>
            </div>
          </div>
        </div>
        <div className="px-2 pt-2 h-40">
          {image ? (
            <PdfHandler
              fileClassName="w-full h-full"
              withOpenButton={false}
              file={image}
            />
          ) : null}
        </div>
      </div>
    </Link>
  );
};

export default ConditionCard;
