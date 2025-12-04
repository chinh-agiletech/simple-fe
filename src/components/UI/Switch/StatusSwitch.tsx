
interface StatusSwitchProps {
  status: "active" | "inactive";
  onChange?: (status: "active" | "inactive") => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StatusSwitch({
  status,
  onChange,
  disabled = false,
  size = "md",
}: StatusSwitchProps) {
  const isActive = status === "active";

  const toggle = () => {
    if (disabled || !onChange) return;
    onChange(isActive ? "inactive" : "active");
  };

  const sizeClasses = {
    sm: {
      switch: "h-5 w-9",
      dot: "h-3.5 w-3.5",
      translate: "translate-x-4.5",
      translateOff: "translate-x-0.5",
    },
    md: {
      switch: "h-6 w-11",
      dot: "h-4 w-4",
      translate: "translate-x-6",
      translateOff: "translate-x-1",
    },
    lg: {
      switch: "h-7 w-14",
      dot: "h-5 w-5",
      translate: "translate-x-8",
      translateOff: "translate-x-1",
    },
  };

  const currentSize = sizeClasses[size];

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={toggle}
        disabled={disabled}
        className={`
          relative inline-flex items-center rounded-full transition-colors duration-200 focus:outline-none
          ${currentSize.switch}
          ${isActive ? "bg-green-500" : "bg-slate-300"}
          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:opacity-90"}
        `}
        title={isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
      >
        <span className="sr-only">Change status</span>
        <span
          className={`
            inline-block transform rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out
            ${currentSize.dot}
            ${isActive ? currentSize.translate : currentSize.translateOff}
          `}
        />
      </button>
      {/* Optional Label */}
      {/* <span className={`text-sm font-medium ${isActive ? 'text-green-600' : 'text-slate-500'}`}>
        {isActive ? 'Hoạt động' : 'Ngừng KD'}
      </span> */}
    </div>
  );
}
