import { toast } from "react-toastify";
import {
  AccentText,
  plusCircleIcon,
  shattibIcon,
  useApi,
  useEffect,
  useParams,
  useState,
} from "../..";
import { Product } from "../../models/Product";
import { Subcateogry } from "../../models/Subcategory";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../assets/const";
import { refreshToken } from "../../hooks/useApi";

const AdminEditProductPage = () => {
  const { data: dataSubCategories } = useApi<Subcateogry[]>(
    "SeededValues/SubCategories"
  );
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = dataSubCategories
    ? dataSubCategories.filter((subCategory) =>
        subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];
  const handleSelectChange = (value: number) => {
    setFormData((prev) => ({
      ...prev,
      subCategoryId: value,
    }));
  };

  // const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     // Convert the FileList to an array of files
  //     setSelectedImages((prev) => [...prev, ...Array.from(files)]);
  //   }
  // };

  const handleAddSpecification = () => {
    setFormData({
      ...formData,
      specifications: [...formData.specifications, { name: "", value: "" }],
    });
  };

  const { id } = useParams(); // Get the product ID from the URL
  const { data, error, isLoading } = useApi<Product>(
    `Products/${id}`,
    "GET",
    true
  );
  const { patchForm } = useApi(`Products/${id}`, "PATCH", true, true);

  function deleteImageRequest(imageId: number) {
    try {
      let headers = {};

      const token = localStorage.getItem("accessToken");
      headers = {
        Authorization: `Bearer ${token}`,
        "Accept-Language": " ",
      };

      const requestOptions = {
        method: "DELETE",
        headers: headers,
      };
      fetch(`${API_URL}Products/${id}/Images/${imageId}`, requestOptions)
        .then(async (res) => {
          if (res.status === 403) {
            await refreshToken();
          }
        })
        .catch((err) => {
          console.log("deleteImageRequest Error: ", err);
        });
    } catch (error) {
      console.log("deleteImageRequest Exception: ", error);
    }
  }

  function uploadImageRequest(image: File) {
    try {
      const imageForm = new FormData();
      let headers = {};

      const token = localStorage.getItem("accessToken");
      headers = {
        Authorization: `Bearer ${token}`,
        "Accept-Language": " ",
      };

      imageForm.append("ProductId", id!);
      imageForm.append("NewImage", image);

      const requestOptions = {
        method: "PATCH",
        headers: headers,
        body: imageForm,
      };
      fetch(`${API_URL}Products/${id}/Images`, requestOptions)
        .then(async (res) => {
          if (res.status === 403) {
            await refreshToken();
          }
        })
        .catch((err) => {
          console.log("uploadImageRequest Error: ", err);
        });
    } catch (error) {
      console.log("uploadImageRequest Exception: ", error);
    }
  }

  // Store images selected in the file input
  // const [selectedImages, setSelectedImages] = useState<File[]>([]);
  // const handleDeleteImage = (index: number) => {
  //   setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  // };

  // Store the image paths from API to display them
  // const [images, setImages] = useState([{ imagePath: "" }]);
  // Store the image paths and ids from the API to display them
  const [getImages, setGetImages] = useState<
    { id: number; imagePath: File | null }[]
  >([]);
  const handleDeleteImageRequest = async (imageId: number) => {
    await deleteImageRequest(imageId);
    // Remove the image from the state (local deletion)
    setGetImages((prev) => prev.filter((image) => image.id !== imageId));
  };

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const image = e.target.files?.[0];

    if (image) {
      uploadImageRequest(image);
    }
  }

  const [formData, setFormData] = useState({
    subCategoryId: data?.subCategoryId,
    name: "",
    description: "",
    features: "",
    price: 0.0,
    measurementUnit: "",
    meaurements: "",
    manufacturingCountry: "",
    color: "",
    deaf: "",
    retrivalAndReplacing: "",
    notes: "",
    wareHouseCode: "",
    specifications: [{ name: "", value: "" }],
    colors: [{ hexCode: "", price: 0, imagePath: "" }],
    measurements: [{ name: "", price: 0 }],
  });

  useEffect(() => {
    if (data) {
      setFormData({
        subCategoryId: data.subCategoryId,
        name: data.name,
        description: data.description,
        features: data.features,
        price: data.price,
        measurementUnit: data.measurementUnit,
        meaurements:
          data.measurements.length === 0 ? "" : data.measurements[0].name,
        manufacturingCountry: data.manufacturingCountry,
        color: data.colors.length === 0 ? "" : data.colors[0].hexCode,
        deaf: data.deaf,
        retrivalAndReplacing: data.retrivalAndReplacing,
        notes: data.notes,
        wareHouseCode: data.warehouseCode,
        specifications: data.productSpecifications,
        colors: data.colors || [],
        measurements: data.measurements || [],
      });
      // setGetImages(data.images);
    }
  }, [data]);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleColorChange = (
    index: number,
    field: string,
    value: string | File | null
  ) => {
    const updatedColors = [...formData.colors];
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    setFormData({ ...formData, colors: updatedColors });
  };

  // const handleColorChange = (
  //   index: number,
  //   field: string,
  //   value: string | File | null
  // ) => {
  //   const updatedColors = [...formData.colors];

  //   if (field === "imagePath" && value instanceof File) {
  //     const imagePath = URL.createObjectURL(value);
  //     updatedColors[index] = { ...updatedColors[index], [field]: imagePath };
  //   } else {
  //     updatedColors[index] = { ...updatedColors[index], [field]: value };
  //   }

  //   // setColors(updatedColors);

  //   setFormData((prevData) => ({
  //     ...prevData,
  //     Colors: updatedColors,
  //   }));
  // };

  const handleMeasurementChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMeasurements = [...formData.measurements];
    updatedMeasurements[index] = {
      ...updatedMeasurements[index],
      [field]: value,
    };
    setFormData({ ...formData, measurements: updatedMeasurements });
  };

  // Add color field
  const handleAddColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { hexCode: "", price: 0, imagePath: "" }],
    });
  };

  // Add measurement field
  const handleAddMeasurement = () => {
    setFormData({
      ...formData,
      measurements: [...formData.measurements, { name: "", price: 0 }],
    });
  };

  // Handle deleting a color
  const handleDeleteColor = (index: number) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  // Handle deleting a measurement
  const handleDeleteMeasurement = (index: number) => {
    setFormData({
      ...formData,
      measurements: formData.measurements.filter((_, i) => i !== index),
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSpecificationChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedSpecifications = [...formData.specifications];
    updatedSpecifications[index] = {
      ...updatedSpecifications[index],
      [name]: value,
    };
    setFormData({
      ...formData,
      specifications: updatedSpecifications,
    });
  };

  const handleDeleteSpecification = (index: number) => {
    const updatedSpecifications = formData.specifications.filter(
      (_, i) => i !== index
    );
    setFormData({
      ...formData,
      specifications: updatedSpecifications,
    });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const form = new FormData();

    form.append("ProductId", String(parseInt(id || "")));
    form.append("SubCategoryId", String(formData.subCategoryId));
    form.append("Name", formData.name || "");
    form.append("Description", formData.description || "");
    form.append("Features", formData.features || "");
    form.append("Price", String(formData.price));
    form.append("MeasurementUnit", formData.measurementUnit || "");
    form.append("Meaurements", formData.meaurements || "");
    form.append("ManufacturingCountry", formData.manufacturingCountry || "");
    form.append("Color", formData.color || "");
    form.append("Deaf", formData.deaf || "");
    form.append("RetrivalAndReplacing", formData.retrivalAndReplacing || "");
    form.append("Notes", formData.notes || "");
    form.append("WareHouseCode", formData.wareHouseCode || "");

    // Handle specifications
    formData.specifications.forEach((spec, index) => {
      form.append(`Specifications[${index}][name]`, spec.name || "");
      form.append(`Specifications[${index}][value]`, spec.value || "");
    });

    formData.measurements.forEach((measure, index) => {
      form.append(`Measurements[${index}][name]`, measure.name || "");
      form.append(`Measurements[${index}][price]`, `${measure.price}` || "");
    });

    formData.colors.forEach((color, index) => {
      form.append(`Colors[${index}][hexCode]`, color.hexCode || "");
      form.append(`Colors[${index}][price]`, `${color.price}` || "");
      form.append(`Colors[${index}][ImagePath]`, color.imagePath || "");
    });

    // Handle images (only add if there are selected images)
    // if (selectedImages.length > 0) {
    //   selectedImages.forEach((file, index) => {
    //     form.append(`Images[${index}]`, file);
    //   });
    // } else {
    //   // If no images are selected, send an empty array for images
    //   form.append("Images", "[]");
    // }

    // // Handle images
    // formData.images.forEach((image, index) => {
    //   if (image.imagePath) {
    //     form.append(`Images[${index}]`, image.imagePath);
    //   }
    // });

    // Handle array fields like specifications and images (if applicable)
    // formData.specifications.forEach((spec, index) => {
    //   form.append(`Specifications[${index}][name]`, spec.name || "");  // Default to empty string if undefined
    //   form.append(`Specifications[${index}][value]`, spec.value || "");  // Default to empty string if undefined
    // });

    // formData.images.forEach((image, index) => {
    //   if (image.imagePath) {
    //     form.append(`Images[${index}]`, image.imagePath);  // Append image paths as string
    //   }
    // });

    await patchForm(form);
    toast.success("تم تعديل المنتج بنجاح", {
      theme: "colored",
      style: { backgroundColor: "#c18a33" },
      icon: () => <img src={shattibIcon} />,
    });
    navigate("/admin/products");
    setTimeout(() => {
      setShowSuccessPopup(false);
    }, 3000);
  };

  return (
    <main className="p-main">
      <AccentText>تعديل المنتج</AccentText>
      <div className="max-w-3xl mx-auto mt-8 p-6 border border-gray-300 rounded-lg shadow-lg bg-white">
        {isLoading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  اسم المنتج
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="اسم المنتج"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="wareHouseCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  رمز التخزين
                </label>
                <input
                  type="text"
                  name="wareHouseCode"
                  id="wareHouseCode"
                  value={formData.wareHouseCode}
                  onChange={handleInputChange}
                  placeholder="رمز التخزين"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block text-sm font-medium text-gray-700"
                >
                  السعر
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="السعر"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* <div>
                <label
                  htmlFor="measurementUnit"
                  className="block text-sm font-medium text-gray-700"
                >
                  القياسات
                </label>
                <input
                  type="text"
                  name="meaurements"
                  id="meaurements"
                  value={formData.meaurements}
                  onChange={handleInputChange}
                  placeholder="القياسات"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div> */}

              <div>
                <label
                  htmlFor="measurementUnit"
                  className="block text-sm font-medium text-gray-700"
                >
                  وحدة القياس
                </label>
                <input
                  type="text"
                  name="measurementUnit"
                  id="measurementUnit"
                  value={formData.measurementUnit}
                  onChange={handleInputChange}
                  placeholder="وحدة القياس"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Colors */}
              <div>
                <h3 className="my-2">الألوان</h3>
                {formData.colors.map((color, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    {/* Display Color Image if it exists */}
                    {color.imagePath ? (
                      <div className="relative w-20 h-20">
                        <img
                          src={color.imagePath}
                          alt={`Color ${index + 1}`}
                          className="w-full h-full object-cover rounded-md"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          ×
                        </button>
                      </div>
                    ) : (
                      <div className="w-20 h-20 bg-gray-200 rounded-md"></div> // Placeholder if no image
                    )}

                    {/* Color Input */}
                    <input
                      type="color"
                      value={color.hexCode}
                      onChange={(e) =>
                        handleColorChange(index, "hexCode", e.target.value)
                      }
                      className="w-16 h-10 border rounded"
                    />

                    {/* Price Input */}
                    <input
                      type="number"
                      placeholder="السعر"
                      value={color.price}
                      onChange={(e) =>
                        handleColorChange(index, "price", e.target.value)
                      }
                      className="w-1/3 p-3 border border-gray-300 rounded-md"
                    />

                    {/* Upload New Image */}
                    <input
                      type="file"
                      className="p-2 border border-gray-300 rounded-md"
                      onChange={(e) =>
                        handleColorChange(
                          index,
                          "imagePath",
                          e.target.files ? e.target.files[0] : null
                        )
                      }
                    />

                    {/* Delete Color Button */}
                    <button
                      type="button"
                      onClick={() => handleDeleteColor(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddColor}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  إضافة لون
                </button>
              </div>

              {/* Measurements */}
              <div>
                <h3 className="my-2">القياسات</h3>
                {formData.measurements.map((measurement, index) => (
                  <div key={index} className="flex gap-4 mb-2">
                    <input
                      type="text"
                      placeholder="الاسم"
                      value={measurement.name}
                      onChange={(e) =>
                        handleMeasurementChange(index, "name", e.target.value)
                      }
                      className="w-1/2 p-3 border border-gray-300 rounded-md"
                    />
                    <input
                      type="number"
                      placeholder="السعر"
                      value={measurement.price}
                      onChange={(e) =>
                        handleMeasurementChange(index, "price", e.target.value)
                      }
                      className="w-1/2 p-3 border border-gray-300 rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteMeasurement(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddMeasurement}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  إضافة قياس
                </button>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  وصف المنتج
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="وصف المنتج"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* <div>
                <label
                  htmlFor="features"
                  className="block text-sm font-medium text-gray-700"
                >
                  مميزات المنتج
                </label>
                <textarea
                  name="features"
                  id="features"
                  value={formData.features}
                  onChange={handleInputChange}
                  placeholder="مميزات المنتج"
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div> */}

              {/* Product Specifications */}
              <div>
                <h3 className="font-medium text-gray-700">المواصفات:</h3>
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-4 mt-2">
                    <input
                      type="text"
                      name="name"
                      value={spec.name}
                      onChange={(e) => handleSpecificationChange(index, e)}
                      placeholder="اسم المواصفة"
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="text"
                      name="value"
                      value={spec.value}
                      onChange={(e) => handleSpecificationChange(index, e)}
                      placeholder="قيمة المواصفة"
                      className="w-1/2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={() => handleDeleteSpecification(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      حذف
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddSpecification}
                  className="mt-4 text-blue-500 hover:text-blue-700"
                >
                  إضافة مواصفة
                </button>
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  صور المنتج
                </label>
                <div className="flex flex-wrap gap-4 mt-2">
                  {getImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-32 h-32 overflow-hidden rounded-lg border border-gray-200"
                    >
                      <img
                        // src={image.imagePath}
                        alt={`Product Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDeleteImageRequest(image.id)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <button
                    className="w-32 h-32 flex justify-center items-center rounded-lg border"
                    type="button"
                  >
                    <input
                      type="file"
                      className="absolute opacity-0 w-32 h-32"
                      onChange={handleImageUpload}
                    />
                    <img src={plusCircleIcon} />
                  </button>
                </div>
                {/* <button
                  type="button"
                  onClick={handleAddImage}
                  className="text-blue-500 hover:text-blue-700"
                >
                  إضافة صورة
                </button> */}
              </div>

              {/* Images */}
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">
                  تغيير الصور
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleAddImage}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {selectedImages.length > 0 && (
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-700">
                      الصور المحددة:
                    </h3>
                    <div className="flex gap-4">
                      {selectedImages.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Selected ${index}`}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteImage(index)}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div> */}

              <div className="w-full">
                <label className={"flex self-start my-2 text-sm"}>
                  الصنف الفرعي
                </label>
                <div className="relative">
                  {/* Search Input */}
                  <input
                    type="text"
                    placeholder="ابحث عن صنف..."
                    className="mb-2 px-3 py-2 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />

                  {/* Select Dropdown */}
                  <select
                    name="SubCategoryId"
                    id="SubCategoryId"
                    className="px-3 py-2 w-full bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) => {
                      handleSelectChange(parseInt(e.target.value));
                    }}
                    value={formData.subCategoryId}
                  >
                    <option value="">اختر الصنف الفرعي</option>
                    {filteredData.length > 0 ? (
                      filteredData.map((subCategory) => (
                        <option key={subCategory.id} value={subCategory.id}>
                          {subCategory.name}
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>
                        لا توجد نتائج
                      </option>
                    )}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white font-semibold rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-black"
              >
                تحديث المنتج
              </button>
            </form>

            {/* <div className="mt-8">
              {formData.images.length > 0 && (
                <div className="flex flex-col gap-4">
                  <p className="text-gray-700">صور المنتج:</p>
                  <div className="flex gap-4">
                    {formData.images.map((image, index) => (
                      <div
                        key={index}
                        className="w-32 h-32 overflow-hidden rounded-lg border border-gray-200"
                      >
                        <img
                          src={image.imagePath}
                          alt={`Product Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div> */}
          </>
        )}
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed top-32">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs">
            <p className="text-center text-green-600 font-semibold">
              تم تعديل المنتج بنجاح
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default AdminEditProductPage;
