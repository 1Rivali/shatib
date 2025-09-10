interface Props {
  img: string;
  num: number;
  title: string;
  color: "red" | "green" | "blue" | "gold";
}

const StatisticsCard = ({ img, num, title, color }: Props) => {
  return (
    <div className="w-52">
      <div className="rounded-xl shadow-xl flex flex-col items-center gap-2 p-4">
        <img className="self-start" src={img} alt="" />

        <span
          className={`text-4xl font-bold ${
            color === "red"
              ? "text-red-600"
              : color === "green"
              ? "text-green-600"
              : color === "blue"
              ? "text-blue-500"
              : color === "gold"
              ? "text-amber-600"
              : ""
          }`}
        >
          {num}
        </span>

        <span className="font-bold">{title}</span>
      </div>
      <div
        className={`h-1 rounded-xl w-11/12 mx-auto mt-2 ${
          color === "red"
            ? "bg-red-600 bg-opacity-50"
            : color === "green"
            ? "bg-green-600 bg-opacity-50"
            : color === "blue"
            ? "bg-blue-500 bg-opacity-50"
            : color === "gold"
            ? "bg-amber-600 bg-opacity-50"
            : ""
        }`}
      />
    </div>
  );
};

export default StatisticsCard;
