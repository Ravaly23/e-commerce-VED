interface ButtonProps {
  text: string;
  background?: string;
  textColor?: string;
  height?: string;
}

export default function Button({ text, background }: ButtonProps) {
  return (
    <button
      className={`bg-${background} mt-[36px] w-full mb-[36px] text-[#FFFFFF] h-[40px] text-xl rounded-[15px] cursor-pointer`}
      type="submit"
    >
      {text}
    </button>
  );
}
