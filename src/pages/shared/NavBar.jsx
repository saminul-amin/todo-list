import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import useAuth from "../../hooks/useAuth";

import "@fontsource/coiny";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userLogOut } = useAuth();
  //   console.log(user.email);

  const handleLogOut = () => {
    userLogOut()
      .then(() => console.log("logged out"))
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li>
        <Link
          to="/"
          className="text-white py-2 px-4 block md:inline-block hover:bg-stone-700 rounded-lg"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/tasks"
          className="text-white py-2 px-4 block md:inline-block hover:bg-stone-700 rounded-lg"
        >
          Tasks
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className="text-white py-2 px-4 block md:inline-block hover:bg-stone-700 rounded-lg"
        >
          Contact Us
        </Link>
      </li>
      {user?.email ? (
        <>
          <li>
            <button
              onClick={handleLogOut}
              className="text-white py-2 px-4 block md:inline-block hover:bg-stone-700 rounded-lg"
            >
              Sign Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link
              to="/signin"
              className="text-white py-2 px-4 block md:inline-block hover:bg-stone-700 rounded-lg"
            >
              Sign In
            </Link>
          </li>
          <li>
            <Link
              to="/signup"
              className="text-white py-2 px-4 block md:inline-block hover:bg-stone-700 rounded-lg"
            >
              Sign Up
            </Link>
          </li>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-stone-600 p-4 shadow-md">
      <div className="container mx-auto max-w-6xl flex justify-between items-center">
        <Link
          to="/"
          className="text-white text-2xl font-medium"
          style={{ fontFamily: "Coiny, serif" }}
        >
          D'Oh List
        </Link>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="text-white w-6 h-6" />
            ) : (
              <Menu className="text-white w-6 h-6" />
            )}
          </button>
        </div>
        <ul
          className={`md:flex md:space-x-6 absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-stone-600 md:bg-transparent md:flex-row flex-col items-center md:items-center transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          }`}
        >
          {links}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
