import React, { useState } from "react";
import "./NavBar.css";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignIn = () => {
    setIsLoggedIn(true);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li>
          <a href="#community">Community</a>
        </li>
        <li>
          <a href="#my-trips">My Trips</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      {/* Profile Dropdown or Sign In/Register Button */}
      <div className="profile-dropdown">
        {!isLoggedIn ? (
          <button className="profile-button" onClick={handleSignIn}>
            Sign In / Register
          </button>
        ) : (
          <button
            className={`profile-button ${isLoggedIn ? "avatar-visible" : ""}`}
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
          <div className="dropdown-menu">
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
            <a href="#logout" onClick={handleSignOut}>
              Log Out
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
