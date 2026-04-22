import * as Slider from "@radix-ui/react-slider";

interface FieldsetProps {
    titre: string,
    element?: string[]
    type: string,
    price?: number[]
    onValueChange?: (value: number[]) => void
    maxPrice?: number
}

export default function Fieldset({ titre, type, element, price, maxPrice,onValueChange }: FieldsetProps) {
    const elementFiltre = element ? element.map((item, index) =>
        <label key={titre + '' + index} className="flex gap-2 cursor-pointer">
            <input className="appearance-none w-2 h-2  rounded-full checked:bg-black checked:ring-2 checked:ring-black checked:ring-inset relative top-2.5"
                type={type} name={titre} value={item} />
            <span>{item}</span>
        </label>
    ) : null

    const priceRange = <Slider.Root
        value={price}
        onValueChange={(value) => onValueChange?.(value)}
        max={maxPrice}
        step={100}
        className="relative flex items-center w-full h-5"
    >
        <Slider.Track className="bg-gray-300 relative grow rounded-full h-3">
            <Slider.Range className="absolute bg-black rounded-full h-full" />
        </Slider.Track>

        <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full" />
        <Slider.Thumb className="block w-4 h-4 bg-white border rounded-full" />
    </Slider.Root>

    return (
        <fieldset>
            <legend className="font-semibold mb-2">{titre}</legend>
            <div className="space-y-2">
                {type === "radio" ? elementFiltre : priceRange}
            </div>
        </fieldset>
    )
}