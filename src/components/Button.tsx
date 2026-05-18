interface ButtonProps {
  text: string;
  background?: string;
  textColor?: string;
  height?: string;
  disable? : boolean
  onclick? : () => void
}

export default function Button({ text, background,disable = false , onclick}: ButtonProps) {
  return (
    <button
      className={`bg-${background} mt-9 w-full mb-9 text-[#FFFFFF] h-10 text-xl rounded-[15px] cursor-pointer`}
      type="submit"
      disabled={disable}
      onClick={onclick}
    >
      {text}
    </button>
  );
}
