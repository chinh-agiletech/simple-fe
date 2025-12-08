import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const root = document.documentElement;

    if (theme === "auto") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
      root.setAttribute("data-theme", systemTheme.matches ? "dark" : "light");

      const listener = (e: MediaQueryListEvent) => {
        root.setAttribute("data-theme", e.matches ? "dark" : "light");
      };

      systemTheme.addEventListener("change", listener);
      return () => systemTheme.removeEventListener("change", listener);
    }

    root.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
