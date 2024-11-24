export default function Input(
    { placeholder, value, setValue, type = "text", required = false }:
    { placeholder: string, value: any, setValue: Function, type?: string, required?: boolean }
) {
    return <div className="grid gap-1">
        <span className={`text-xs transition-opacity text-neutral-400 ${value == "" ? "opacity-0" : ""}`}>{placeholder}</span>
        <input
            className="outline-none transition-colors border-b focus:border-b-gray-400 pb-2"
            type={type}
            placeholder={placeholder}
            required={required}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    </div>
}