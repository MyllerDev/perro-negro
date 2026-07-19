function Button({
  children,
  type = "button",
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-[#d4af37] text-black hover:bg-[#f0cf62]",

    secondary:
      "border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black",

    ghost:
      "bg-white/5 text-white hover:bg-white/10",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-xl
        px-6
        py-3
        font-semibold
        transition
        duration-300
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;