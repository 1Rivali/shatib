import ButtonGold from "./ButtonGold";

interface PdfHandlerProps {
  file: string;
  fileClassName: string;
  withOpenButton?: boolean;
}

export const PdfHandler = ({
  file,
  fileClassName = "w-full h-full",
  withOpenButton = true,
}: PdfHandlerProps) => {
  return file.toLowerCase().endsWith(".pdf") ? (
    <div>
      <iframe
        src={`${file}#page=2`}
        title="PDF Viewer"
        style={{ overflow: "hidden" }}
        className={fileClassName}
      />
      {withOpenButton && (
        <ButtonGold
          className="mt-3"
          onClick={() => {
            window.open(file, "_blank", "noopener,noreferrer");
          }}
        >
          فتح الملف
        </ButtonGold>
      )}
    </div>
  ) : (
    <img className={`object-contain ${fileClassName}`} src={`${file}`} alt="" />
  );
};
