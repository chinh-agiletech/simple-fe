/* eslint-disable react-hooks/immutability */
import React, { useState, useEffect } from "react";

interface NumberInputProps {
  value: number;
  onChange: (value: number) => void;
  name?: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  min?: number;
  max?: number;
  className?: string;
  disabled?: boolean;
}

export default function NumberInput({
  value,
  onChange,
  name,
  label,
  placeholder,
  required = false,
  className = "",
  disabled = false,
}: NumberInputProps) {
  // state để hiển thị định dạng tiền tệ
  const [displayValue, setDisplayValue] = useState<string>("");

  // Khi prop value thay đổi, update displayValue
  useEffect(() => {
    setDisplayValue(formatNumber(value));
  }, [value]);

  // format number => string với dấu chấm hàng nghìn
  const formatNumber = (num: number) => {
    if (num === 0) return "";
    return num.toLocaleString("vi-VN"); // 1000 => "1.000"
  };

  const parseNumber = (str: string) => {
    // Loại bỏ tất cả ký tự không phải số
    return Number(str.replace(/\./g, ""));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;

    // Chỉ cho phép số và dấu chấm
    if (/^[\d.]*$/.test(val)) {
      // Loại bỏ những dấu chấm thừa
      const numericValue = parseNumber(val);
      setDisplayValue(val);
      onChange(numericValue);
    }
  };

  const handleBlur = () => {
    // Khi mất focus, format lại hiển thị
    setDisplayValue(formatNumber(value));
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type="text"
        name={name}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${
          disabled
            ? "bg-slate-100 text-slate-500 cursor-not-allowed"
            : "bg-white"
        }`}
        inputMode="numeric"
      />
    </div>
  );
}
