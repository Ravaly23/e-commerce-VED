interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  name?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  onKeyUp?: () => void;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconValid?: React.ReactNode;
  marginBottom?: string;
  passwordVerify?: boolean;
  error?: boolean;
}

export default function Input({
  type,
  placeholder,
  value,
  name,
  onChange,
  onClick,
  onKeyUp,
  iconLeft,
  iconRight,
  iconValid,
  marginBottom,
  passwordVerify,
  error,
}: InputProps) {
  return (
    <div className={`relative mb-${marginBottom}`}>
      {iconLeft && (
        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#3C4382]">
          {" "}
          {iconLeft}{" "}
        </span>
      )}
      <input
        className={`w-full bg-[#FFFFFF] rounded-[15px] h-10 p-1.25 pl-10 border-2 border-transparent hover:border-black focus:border-black outline-none ${error ? "ring-2 ring-red-500" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        onKeyUp={onKeyUp}
      />
      {iconValid && (
        <span
          className={`absolute inset-y-0 right-6 flex items-center pr-3 ${passwordVerify ? "text-[#289A47]" : "text-[#DD181F]"} cursor-pointer`}
        >
          {iconValid}
        </span>
      )}
      {iconRight && (
        <span
          onClick={onClick}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#3C4382] cursor-pointer"
        >
          {iconRight}
        </span>
      )}
    </div>
  );
}
