import React, { useState } from "react";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-800">D'oh List</span>
          </div>

          {/* Hamburger Menu Button (Mobile) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-500 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Tasks
            </a>
            <a
              href="#"
              className="text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              Profile
            </a>
          </div>

          {/* User Profile Section */}
          <div className="hidden md:flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src="https://via.placeholder.com/150" // Replace with user profile image
                alt="User"
              />
            </div>
            <div className="ml-3">
              <span className="text-sm font-medium text-gray-800">
                John Doe
              </span>{" "}
              {/* Replace with user name */}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Dropdown) */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Tasks
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-blue-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Profile
            </a>
          </div>
          {/* User Profile Section (Mobile) */}
          <div className="px-2 pt-2 pb-3 border-t border-gray-200">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://via.placeholder.com/150" // Replace with user profile image
                  alt="User"
                />
              </div>
              <div className="ml-3">
                <span className="text-sm font-medium text-gray-800">
                  John Doe
                </span>{" "}
                {/* Replace with user name */}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
