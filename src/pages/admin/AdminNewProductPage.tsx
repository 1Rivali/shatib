import {
  ButtonGold,
  Link,
  NewProductHeaderText,
  plusCircleIcon,
  TextInput,
  useApi,
  useState,
} from "../..";
import { ColorPost, MeasurementPost } from "../../models/Product";
import { Subcateogry } from "../../models/Subcategory";
import { MyFormData } from "./AdminNewProductContainer";

interface Props {
  formData: MyFormData;
  onInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleSelectChange: (value: number) => void;
  setFormData: React.Dispatch<React.SetStateAction<MyFormData>>;
}

const AdminNewProductPage: React.FC<Props> = ({
  formData,
  onInputChange,
  handleSelectChange,
  setFormData,
}) => {
  const isFormValid = () => {
    return (
      formData.Name !== "" &&
      formData.WareHouseCode !== "" &&
      formData.Price !== 0 &&
      formData.SubCategoryId !== undefined &&
      formData.Description !== "" &&
      formData.Brand !== "" &&
      formData.MeasurementUnit !== "" &&
      formData.Measurements.length !== 0 &&
      formData.ManufacturingCountry !== "" &&
      formData.Colors.length !== 0
    );
  };

  const { data } = useApi<Subcateogry[]>("SeededValues/SubCategories");
  const [searchTerm, setSearchTerm] = useState("");
  const filteredData = data
    ? data.filter((subCategory) =>
        subCategory.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const [measurements, setMeasurements] = useState<MeasurementPost[]>([
    { name: "", price: 0 },
  ]);
  const [colors, setColors] = useState<ColorPost[]>([
    { hexCode: "", price: 0, imagePath: null },
  ]);
  const addMeasurementField = () => {
    setMeasurements([...measurements, { name: "", price: 0 }]);
  };
  const addColorField = () => {
    setColors([...colors, { hexCode: "", price: 0, imagePath: null }]);
  };
  const handleMeasurementChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMeasurements = [...measurements];
    updatedMeasurements[index] = {
      ...updatedMeasurements[index],
      [field]: value,
    };
    setMeasurements(updatedMeasurements);

    setFormData((prevData) => ({
      ...prevData,
      Measurements: updatedMeasurements,
    }));
  };
  const handleColorChange = (
    index: number,
    field: string,
    value: string | File | null
  ) => {
    const updatedColors = [...colors];

    // if (field === "imagePath" && value instanceof File) {
    //   const imagePath = URL.createObjectURL(value);
    //   updatedColors[index] = { ...updatedColors[index], [field]: imagePath };
    // } else {
    updatedColors[index] = { ...updatedColors[index], [field]: value };
    // }

    setColors(updatedColors);

    setFormData((prevData) => ({
      ...prevData,
      Colors: updatedColors,
    }));
  };

  return (
    <main className="overflow-x-hidden">
      <NewProductHeaderText />

      <main className="flex flex-col gap-4 px-main pt-main pb-8">
        <section>
          <div className="flex w-full gap-4">
            <div className="w-full">
              <TextInput
                blackTitle
                title="اسم المنتج"
                placeholder="أدخل اسم المنتج"
                name="Name"
                value={formData.Name}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full">
              <TextInput
                blackTitle
                title="رمز التخزين في شطب"
                placeholder="أدخل رمز التخزين"
                name="WareHouseCode"
                value={formData.WareHouseCode}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full">
              <TextInput
                blackTitle
                title="سعر المنتج"
                placeholder="0.0 ريال"
                name="Price"
                number
                value={formData.Price.toString()}
                onChange={onInputChange}
              />
            </div>
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
                  value={formData.SubCategoryId}
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
          </div>
        </section>
        <section>
          <div className="flex w-full gap-4 h-48">
            <div className="w-2/3">
              <TextInput
                big
                blackTitle
                title="وصف المنتج"
                name="Description"
                value={formData.Description}
                onChange={onInputChange}
              />
            </div>
            <div className="w-1/3">
              <TextInput
                big
                blackTitle
                title="الشركة المصنعة"
                placeholder="اسم الشركة المصنعة"
                name="Brand"
                value={formData.Brand}
                onChange={onInputChange}
              />
            </div>
          </div>
        </section>
        <section>
          <div className="flex w-full gap-4">
            {/* <div className="w-full">
              <TextInput
                blackTitle
                title="الكمية المتوفرة"
                placeholder="أدخل الكمية المتوفرة"
              />
            </div> */}
            <div className="w-full">
              <TextInput
                blackTitle
                title="وحدة القياس"
                placeholder="أدخل وحدة القياس"
                name="MeasurementUnit"
                value={formData.MeasurementUnit}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full">
              <h3 className="mb-4">القياسات</h3>
              {measurements.map((measurement, index) => (
                <div key={index}>
                  <input
                    className="border rounded mx-2 my-2"
                    type="text"
                    name={`measurementName-${index}`}
                    placeholder="الاسم"
                    value={measurement.name}
                    onChange={(e) =>
                      handleMeasurementChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    className="border rounded max-w-16 my-2"
                    type="number"
                    name={`measurementPrice-${index}`}
                    placeholder="السعر"
                    value={measurement.price}
                    onChange={(e) =>
                      handleMeasurementChange(index, "price", e.target.value)
                    }
                  />
                </div>
              ))}
              <div
                onClick={addMeasurementField}
                className="flex gap-2 items-end cursor-pointer"
              >
                <img className="mt-4" src={plusCircleIcon} />
                إضافة قياس
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex w-full gap-4">
            {/* <div className="w-full">
              <TextInput
                blackTitle
                title="المواصفات"
                placeholder="مواصفات المنتج"
              />
            </div> */}
            <div className="w-full">
              <TextInput
                blackTitle
                title="بلد التصنيع"
                placeholder="بلد التصنيع "
                name="ManufacturingCountry"
                value={formData.ManufacturingCountry}
                onChange={onInputChange}
              />
            </div>
            <div className="w-full">
              <h3 className="my-2">الألوان</h3>
              {colors.map((color, index) => (
                <div key={index}>
                  <input
                    className="border rounded"
                    type="file"
                    onChange={(e) =>
                      handleColorChange(
                        index,
                        "imagePath",
                        e.target.files ? e.target.files[0] : null
                      )
                    }
                  />
                  <input
                    className="mx-2"
                    type="color"
                    value={color.hexCode}
                    onChange={(e) =>
                      handleColorChange(index, "hexCode", e.target.value)
                    }
                  />
                  <input
                    className="border rounded max-w-16 my-2"
                    type="number"
                    name={`colorPrice-${index}`}
                    placeholder="السعر"
                    value={color.price}
                    onChange={(e) =>
                      handleColorChange(index, "price", e.target.value)
                    }
                  />
                </div>
              ))}
              <div
                onClick={addColorField}
                className="flex gap-2 items-end cursor-pointer"
              >
                <img className="mt-4" src={plusCircleIcon} />
                إضافة لون
              </div>
            </div>
          </div>
        </section>

        <div className="w-32 self-end pt-4">
          <Link to={"/admin/product/new/2"}>
            <ButtonGold disabled={!isFormValid()}>التالي</ButtonGold>
          </Link>
        </div>
      </main>
    </main>
  );
};

export default AdminNewProductPage;
