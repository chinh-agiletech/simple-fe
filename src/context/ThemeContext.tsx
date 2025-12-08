/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext } from "react";
import { useTheme } from "../hooks/useTheme";

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }) => {
  const themeState = useTheme();

  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
