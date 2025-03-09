import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false); // Track hamburger menu state

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle sign-in action
  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  // Handle sign-out action
  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
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
              <Link to="/find-ride">Search for Rides</Link>
            </li>
            <li>
              <Link to="/driver-sign-up">Be a Driver</Link>
            </li>
            <li>
              <Link to="/map-page">Map</Link>
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
