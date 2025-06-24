import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { SideBar } from './indexComponents';
import { Moon, Sun } from 'lucide-react';

export const Header = ({ userRole }) => {
  const [visible, setVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark" || true;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", JSON.stringify(darkMode));
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", JSON.stringify(darkMode));
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full  backdrop-blur-md bg-white dark:bg-gray-800 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700 shadow-sm"
            : "bg-transparent border-transparent border-b border-b-amber-50 dark:border-b dark:border-b-gray-600"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            <span className="text-lg dark:text-white text-black  font-semibold tracking-wide">
              Shenbagha College Of Nursing
            </span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>

            <Button
              icon="pi pi-bars"
              onClick={() => setVisible(true)}
              aria-controls={visible ? 'sbar' : null}
              aria-expanded={visible ? true : false}
              className="text-white bg-gray-800 hover:bg-gray-700 border-none"
            />
          </div>
        </div>
      </header>

      <SideBar
        id="sbar"
        visible={visible}
        setVisible={setVisible}
        onHide={() => setVisible(false)}
        userRole={userRole}
      />
    </>
  );
};
