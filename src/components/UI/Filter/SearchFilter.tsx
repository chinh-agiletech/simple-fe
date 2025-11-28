import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { MdSearch, MdClose } from "react-icons/md";

export interface SearchFilterProps {
  placeholder?: string;
  onSearch: (value: string) => void;
  debounceTime?: number;
  allowClear?: boolean;
  className?: string;
  size?: "small" | "middle" | "large";
}

export default function SearchFilter({
  placeholder = "Search...",
  onSearch,
  debounceTime = 300,
  allowClear = true,
  className = "",
  size = "middle",
}: SearchFilterProps) {
  const [searchValue, setSearchValue] = useState("");

  // Debounced search effect
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(searchValue);
    }, debounceTime);

    return () => {
      clearTimeout(timer);
    };
  }, [searchValue, debounceTime, onSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        size={size}
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        prefix={<MdSearch className="text-slate-400" size={18} />}
        suffix={
          allowClear && searchValue ? (
            <button
              onClick={handleClear}
              className="hover:bg-slate-100 rounded-full p-1 transition-colors duration-200"
              type="button"
            >
              <MdClose
                className="text-slate-400 hover:text-slate-600"
                size={16}
              />
            </button>
          ) : null
        }
        className="rounded-lg"
      />
    </div>
  );
}
