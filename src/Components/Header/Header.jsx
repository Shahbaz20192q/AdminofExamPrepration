import React, { useContext } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { StoreContext } from "../../Context/ContextStore";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken, setUser } = useContext(StoreContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Admin Panel</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              to="/"
              className={`link ${location.pathname === "/" ? "active" : ""}`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/classes"
              className={`link ${
                location.pathname === "/classes" ? "active" : ""
              }`}
            >
              Classes
            </Link>
          </li>
          <li>
            <Link
              to="/meh"
              className={`link ${location.pathname === "/meh" ? "active" : ""}`}
            >
              MEH
            </Link>
          </li>

          <li>
            <Link
              to="/gk"
              className={`link ${location.pathname === "/gk" ? "active" : ""}`}
            >
              GK
            </Link>
          </li>

          {/* Blogs */}

          <li>
            <Link
              to="/informationalNews"
              className={`link ${
                location.pathname === "/informationalNews" ? "active" : ""
              }`}
            >
              Informational News
            </Link>
          </li>

          <li>
            <Link
              to="/jobs"
              className={`link ${
                location.pathname === "/jobs" ? "active" : ""
              }`}
            >
              Jobs
            </Link>
          </li>

          <li>
            <Link
              to="/ebooks"
              className={`link ${
                location.pathname === "/ebooks" ? "active" : ""
              }`}
            >
              E-Books
            </Link>
          </li>

          <li>
            <Link
              to="/users"
              className={`link ${
                location.pathname === "/users" ? "active" : ""
              }`}
            >
              Users
            </Link>
          </li>

          <li>
            <Link
              to="/settings"
              className={`link ${
                location.pathname === "/settings" ? "active" : ""
              }`}
            >
              Settings
            </Link>
          </li>
          <li
            className="link"
            onClick={() => {
              const confirmed = window.confirm("Are you sure to logout?");
              if (confirmed) {
                setToken("");
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("user");
                setUser({});
                navigate("/login");
              }
            }}
          >
            Logout
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
