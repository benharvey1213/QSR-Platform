export default function Input(
    { placeholder, value, setValue, type = "text", required = false }:
    { placeholder: string, value: string, setValue: Function, type?: string, required?: boolean }
) {
    return <input
        className="outline-none transition-colors border-b focus:border-b-gray-400 pb-2"
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => setValue(e.target.value)}
    />
}