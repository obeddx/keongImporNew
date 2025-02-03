// components/ThemeContext.tsx
"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Membuat context untuk tema
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

// Membuat ThemeProvider untuk menyediakan tema pada aplikasi
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Fungsi untuk toggle dark mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (isDarkMode) {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useTheme = () => useContext(ThemeContext);
