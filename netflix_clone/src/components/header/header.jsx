import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./header.css";

function Header() {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isLoggedIn = localStorage.getItem("demoLoggedIn") === "true";

  // Change the header background when scrolling.
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 50);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Search for movies.
  function handleSearch(event) {
    event.preventDefault();

    const query = searchText.trim();

    if (query) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setMenuOpen(false);
    }
  }

  // Log out of the demo account.
  function handleLogout() {
    localStorage.removeItem("demoLoggedIn");
    navigate("/login");
    window.location.reload();
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header
      className={`header_outer_container ${isScrolled ? "scrolled" : ""}`}
    >
      <div className="header_container">
        <div className="header_left">
          <button
            type="button"
            className="mobile_menu_button"
            onClick={() => setMenuOpen((previous) => !previous)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>

          <Link to="/home" className="brand_link" onClick={closeMenu}>
            <img
              className="header_logo"
              src={require("../../assets/images/Netflix_Logo_PMS.png")}
              alt="Netflix"
            />
          </Link>

          <nav
            className={`nav_links ${menuOpen ? "mobile_open" : ""}`}
            aria-label="Main navigation"
          >
            <Link to="/home" onClick={closeMenu}>
              Home
            </Link>

            <Link to="/tv-shows" onClick={closeMenu}>
              TV Shows
            </Link>

            <Link to="/movies" onClick={closeMenu}>
              Movies
            </Link>

            <Link to="/latest" onClick={closeMenu}>
              Latest
            </Link>

            <Link to="/my-list" onClick={closeMenu}>
              My List
            </Link>
          </nav>
        </div>

        <div className="header_right">
          <form className="search_form" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search movies..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              aria-label="Search movies"
            />

            <button type="submit" className="search_button" aria-label="Search">
              <SearchIcon />
            </button>
          </form>

          <button
            type="button"
            className="notification_button"
            aria-label="Notifications"
            title="Notifications"
          >
            <NotificationsIcon />
          </button>

          <Link
            to="/login"
            className="login_link"
            aria-label="My Account"
            title="My Account"
          >
            <AccountCircleIcon />
            <span>My Account</span>
          </Link>

          {isLoggedIn && (
            <button
              type="button"
              className="logout_button"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
