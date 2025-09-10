import { useState, eyeIcon, Link } from "..";

interface Props {
  title?: string;
  icon?: string;
  iconLink?: string;
  password?: boolean;
  placeholder?: string;
  blackTitle?: boolean;
  big?: boolean;
  name?: string;
  number?: boolean;
  isPhoneNumber?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value?: string;
  bordered?: boolean;
  inputType?: string;
}

const TextInput = ({
  title,
  icon,
  iconLink,
  password = false,
  placeholder = "",
  blackTitle = false,
  big = false,
  name,
  number = false,
  onChange,
  value,
  bordered = false,
  inputType,
  isPhoneNumber = false,
}: Props) => {
  const [hidden, setHidden] = useState(password);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (number) {
      // Prevent negative numbers
      const value = e.target.value;
      if (!/^\d*\.?\d*$/.test(value)) return; // Ensure only valid number input
      if (parseFloat(value) < 0) return; // Prevent negative numbers
    }

    // Call the original onChange handler if it's provided
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <>
      <div className="flex flex-col h-full">
        {title ? (
          <label
            className={
              blackTitle
                ? "flex self-start my-2 text-sm"
                : "flex self-start my-2 text-gray-400 text-sm font-medium"
            }
          >
            {title}
          </label>
        ) : null}

        <div className="relative h-full">
          {iconLink ? (
            <Link
              to={iconLink}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <img src={icon} />
            </Link>
          ) : (
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              <img src={icon} />
            </span>
          )}
          {isPhoneNumber && (
            <span className="absolute inset-y-0 left-0 flex items-center px-3 text-primary border border-primary">
              +966
            </span>
          )}
          {big ? (
            <textarea
              className="resize-none h-full w-full py-3 ps-3 text-gray-700 bg-white border rounded-md focus:outline-none focus:border-amber-400"
              placeholder={placeholder}
              name={name}
              onChange={handleOnChange}
              value={value}
            />
          ) : (
            <input
              type={
                inputType
                  ? inputType
                  : hidden
                  ? "password"
                  : number
                  ? "number"
                  : "text"
              }
              className={
                icon
                  ? `h-full w-full py-3 pl-10 pr-10 text-gray-700 bg-white border rounded-md focus:outline-none focus:border-amber-400 ${
                      bordered ? "border-2 border-black" : ""
                    }`
                  : `h-full w-full py-3 pl-10 pr-2 text-gray-700 bg-white border rounded-md focus:outline-none focus:border-amber-400 ${
                      bordered ? "border-2 border-black" : ""
                    }`
              }
              placeholder={placeholder}
              name={name}
              onChange={handleOnChange}
              value={value}
            />
          )}
          {password ? (
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <img onClick={() => setHidden(!hidden)} src={eyeIcon} />
            </span>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default TextInput;
