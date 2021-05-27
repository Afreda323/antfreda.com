import React from "react";

export default function Switch() {
  const DARK_MODE = "darkMode";
  const getDarkMode = () => {
    if (!localStorage) return true;
    const darkMode = localStorage.getItem(DARK_MODE);
    if (darkMode) {
      return JSON.parse(darkMode);
    }

    return true;
  };

  const [darkMode, setDarkMode] = React.useState(getDarkMode());

  React.useEffect(() => {
    document.querySelector("html").className = darkMode ? "dark" : "";
    localStorage.setItem(DARK_MODE, darkMode);
  }, [darkMode]);

  return (
    <div className="fixed bottom-0 right-0">
      <button
        className="w-full h-full p-4 cursor-pointer"
        aria-label="Color mode"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? (
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        ) : (
          <svg
            className="h-6 w-6 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
