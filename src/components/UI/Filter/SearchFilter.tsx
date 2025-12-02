import React, { useState, useEffect } from "react";
import classNames from "classnames";

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
  className = "",
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

  return (
    <input
      placeholder={placeholder}
      value={searchValue}
      onChange={handleChange}
      className={classNames(
        "w-full bg-white py-2 px-[14px] rounded-full",
        className
      )}
    />
  );
}
