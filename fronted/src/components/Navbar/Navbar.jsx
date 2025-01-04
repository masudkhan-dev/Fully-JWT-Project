import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [avater, setAvater] = useState(false);

  const { userEmail, userName, logout } = useAuth();

  const navItems = [
    { title: "Home", href: "/" },
    { title: "Post", href: "/post" },
    { title: "Services", href: "/services" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-white shadow-lg fixed z-40 top-0 left-0 right-0 py-2">
      <div className="px-4">
        <div className="flex justify-between items-center ">
          <Link to="/" className="font-bold text-2xl">
            Logo
          </Link>

          <div className="hidden md:flex items-center">
            <div className="flex space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setActive(item.title)}
                  className={`px-3 py-2 rounded-md transition duration-700 ${
                    active === item.title
                      ? "bg-black text-white"
                      : "text-gray-600 hover:bg-black hover:text-white"
                  }`}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:flex">
            {userName || userEmail ? (
              <div>
                <div className="relative inline-block">
                  {/* Profile Button */}
                  <div
                    className="w-12 h-12 rounded-full overflow-hidden cursor-pointer border-2 border-gray-300"
                    onClick={() => setAvater(!avater)}
                  >
                    <img
                      src="https://savedp.com/wp-content/uploads/2024/08/tom-and-jerry-dp-1024x1024.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Dropdown Menu */}
                  {avater && (
                    <div className="absolute right-0 p-3 w-52 bg-green-100 rounded-lg shadow-lg z-50">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="text-sm font-medium text-gray-700">
                          Name: {userName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {userEmail}
                        </p>
                      </div>
                      <div className="py-2">
                        <button
                          className="cursor-pointer transition-all bg-red-500 text-white px-6 py-2 rounded border-red-600 border-b-8 hover:brightness-110 active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-full"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <button className="px-4 py-2 text-black border border-black hover:text-white hover:bg-black transition duration-700 rounded-md">
                    Login
                  </button>
                </Link>
                <Link to="/register">
                  <button className="px-4 py-2  text-white rounded-md bg-black border border-black hover:bg-white hover:text-black  transition duration-700">
                    Register
                  </button>
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-white hover:bg-black focus:outline-none transition-all duration-700 rounded-md p-2"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden transition-all duration-700">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                onClick={() => setActive(item.title)}
                className={`block px-3 py-2 rounded-md transition duration-700 ${
                  active === item.title
                    ? "bg-black text-white"
                    : "text-gray-600 hover:bg-black hover:text-white"
                }`}
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-col space-y-2 px-3 py-2 text-center">
              <button className="w-full text-left px-4 py-2 text-gray-600 hover:text-white hover:bg-black transition duration-700 rounded-md">
                Login
              </button>
              <button className="w-full px-4 py-2 text-white rounded-md bg-black transition duration-700">
                Register
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
