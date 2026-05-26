interface InputProps {
    type: string,
    placeholder: string,
    name?: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    onClick?: () => void,
    onKeyUp? : () => void,
    iconLeft?: React.ReactNode,
    iconRight?: React.ReactNode,
    iconValid?: React.ReactNode,
    marginBottom?: string,
    passwordVerify? : boolean,
    className?: string,
    defaultValue?:string,
    // onChange?: ()=>{}
}

export default function Inpute({ type, placeholder,name, onChange, onClick,onKeyUp,iconLeft, iconRight, iconValid, marginBottom,passwordVerify,className,defaultValue}: InputProps) {


    return (
        <div className={`relative mb-[${marginBottom}]`}>
            {iconLeft && <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#3C4382]"> {iconLeft} </span>}
            <input
                className={className}
                type={type}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                onKeyUp={onKeyUp}
                defaultValue={defaultValue}
                required
            />
            {iconValid && <span
                className={`absolute inset-y-0 right-6 flex items-center pr-3 ${passwordVerify ?  "text-[#289A47]":"text-[#DD181F]"} cursor-pointer`}
            >{iconValid}</span>}
            {iconRight && <span
                onClick={onClick}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#3C4382] cursor-pointer"
            >{iconRight}</span>}
        </div>
    );
}