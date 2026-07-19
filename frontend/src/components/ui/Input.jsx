function Input({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  name,
  required = false,
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={name}
          className="text-sm text-gray-300"
        >
          {label}
        </label>
      )}

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 outline-none transition focus:border-[#d4af37]"
      />
    </div>
  );
}

export default Input;