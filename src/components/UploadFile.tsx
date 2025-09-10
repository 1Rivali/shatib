import React, { useState, useRef } from "react";
import { ButtonGold, uploadIcon } from ".."; // Adjust the import path for uploadIcon

interface Props {
  title: string;
  subTitle: string;
  onImageChange?: (file: File) => void; // Accepts a File object when a file is selected
  containImg?: boolean;
}

const UploadFile: React.FC<Props> = ({
  title,
  subTitle,
  onImageChange,
  containImg = false,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileSrc, setFileSrc] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState<boolean>(false);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onImageChange) {
      onImageChange(file); // Call the passed-in function to update formData

      // Check if the file is a PDF
      const isFilePdf = file.type === "application/pdf";
      setIsPdf(isFilePdf);

      if (isFilePdf) {
        // Create an object URL for the PDF
        setFileSrc(URL.createObjectURL(file));
      } else {
        // Create a preview for image files
        const reader = new FileReader();
        reader.onloadend = () => {
          setFileSrc(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <span className="text-lg font-bold mb-4">{title}</span>
      <div
        className="flex justify-center items-center w-full h-full rounded-xl border-dashed border-gray-200 border-8 bg-gray-100 hover:bg-yellow-50 transition-all duration-700 cursor-pointer"
        onClick={handleClick} // Open file picker on click
      >
        <div className="w-full h-full flex flex-col justify-center items-center gap-4">
          {fileSrc ? (
            isPdf ? (
              <iframe
                src={fileSrc}
                title="PDF Viewer"
                className="w-full h-full"
              />
            ) : (
              <img
                className={`w-full h-full ${
                  containImg ? "object-contain" : "object-cover"
                }`}
                src={fileSrc}
                alt="Uploaded Preview"
              />
            )
          ) : (
            <>
              <img className="w-16" src={uploadIcon} alt="Upload Icon" />
              <span className="text-blue-950 font-bold">{subTitle}</span>
            </>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
      />
      {fileSrc && isPdf && (
        <ButtonGold
          onClick={() => {
            window.open(fileSrc, "_blank", "noopener,noreferrer");
          }}
        >
          فتح الملف
        </ButtonGold>
      )}
    </div>
  );
};

export default UploadFile;
