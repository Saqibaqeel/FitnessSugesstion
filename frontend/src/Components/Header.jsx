import React, { useEffect, useState } from "react";

const Header = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme; 
  }, []);


  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        theme === "light" ? "bg-light navbar-light" : "bg-dark navbar-dark"
      } shadow-sm`}
    >
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          <i className="fas fa-dumbbell me-2 text-primary"></i>FitAI Planner
        </a>

        <button
          onClick={toggleTheme}
          className={`btn ${
            theme === "light" ? "btn-outline-dark" : "btn-outline-light"
          }`}
        >
          {theme === "light" ? (
            <>
              <i className="fas fa-moon me-2"></i> Dark Mode
            </>
          ) : (
            <>
              <i className="fas fa-sun me-2"></i> Light Mode
            </>
          )}
        </button>
      </div>
    </nav>
  );
};

export default Header;
