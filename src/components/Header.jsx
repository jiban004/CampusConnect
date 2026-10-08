import { useEffect, useState } from "react";
import { Bell, Search, Moon, Sun } from "lucide-react";

function Header() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("campusconnect_theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark-theme", darkMode);

    localStorage.setItem(
      "campusconnect_theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((previous) => !previous);
  };

  return (
    <header className="header">
      <div className="header-search">
        <Search size={19} />
        <input
          type="text"
          placeholder="Search campus information..."
        />
      </div>

      <div className="header-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={
            darkMode ? "Switch to light mode" : "Switch to dark mode"
          }
          title={darkMode ? "Light mode" : "Dark mode"}
        >
          {darkMode ? (
            <Sun size={19} strokeWidth={2.2} />
          ) : (
            <Moon size={19} strokeWidth={2.2} />
          )}
        </button>

        <button className="notification-button">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="header-profile">
          <div className="avatar">AJ</div>

          <div className="header-user">
            <strong>Alex Johnson</strong>
            <span>Computer Science</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;