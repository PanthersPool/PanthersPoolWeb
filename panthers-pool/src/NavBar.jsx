import React, { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./NavBar.css";
import { useAuth } from './AuthContext';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false); // Track hamburger menu state
  const navigate = useNavigate()
  const { isLoggedIn, setIsLoggedIn } = useAuth();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle sign-in action
  const handleSignIn = () => {
    navigate("/login");
  };

  // Handle sign-out action
  const handleSignOut = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('riderID');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/");
  };

  // Toggle hamburger menu visibility
  const toggleNav = () => {
    setIsNavActive(!isNavActive); // Toggle the visibility of nav links
  };

  // Close dropdown when resizing the window to larger size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsDropdownOpen(false); // Close dropdown if window width > 768px
        setIsNavActive(false); // Close the hamburger menu on larger screens
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        {/* Container for navigation links */}
        <div className="nav-container">
          <ul className={`nav-links ${isNavActive ? "active" : ""}`}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to={(isLoggedIn) ? "/find-ride" : "/login"}>Search for Rides</Link>
            </li>
            <li>
              <Link to="/driver-sign-up">Be a Driver</Link>
            </li>
            <li>
              <Link to={(isLoggedIn) ? "/map-page" : "/login"}>Map</Link>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>

        {/* Profile Dropdown or Sign In/Register Button */}
        <div className="profile-container">
          <div className="profile-dropdown">
            {!isLoggedIn ? (
              <button className="profile-button" onClick={handleSignIn}>
                Sign In / Register
              </button>
            ) : (
              <button
                className={`profile-button ${
                  isLoggedIn ? "avatar-visible" : ""
                }`}
                onClick={isLoggedIn ? toggleDropdown : handleSignIn}
              >
                {isLoggedIn ? (
                  <img
                    src="https://static.wikia.nocookie.net/belugacinematicuniversefanon/images/6/6a/Beluga.jpg" // Example avatar image
                    alt="User Avatar"
                    className="avatar"
                  />
                ) : (
                  "Sign In / Register"
                )}
              </button>
            )}
            {isLoggedIn && isDropdownOpen && (
              <div className="profile-dropdown-menu">
                <a href="/profile-page">Profile</a>
                <a href="#settings">Settings</a>
                <a href="#logout" onClick={handleSignOut}>
                  Log Out
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Menu */}
        <button className="hamburger" onClick={toggleNav}>
          <i className="fas fa-bars"></i> {"\u2630"}
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
