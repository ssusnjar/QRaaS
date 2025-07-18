import Logo from '../assets/QRaaS.png';
import { Link, useNavigate  } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import MenusList from './MenusList';

const Header = () => {
    const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

   const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

    return (
      <header className="flex justify-between items-center p-4 ">

      <Link to="/" className="hidden md:inline-block">
        <img className="w-36" src={Logo} alt="" />
      </Link>
        <ul className="flex">
          <li className="p-4"><a href="/">Home</a></li>
          <li className="p-4"><a href="/aboutUs">About Us</a></li>
          <li className="p-4"><a href="/chat">Chat</a></li>
          <li className="p-4"><a href="/form">Form</a></li>
           <div className="relative">
        <FaUserCircle
          size={30}
          onClick={() => setShowDropdown(!showDropdown)}
          className="cursor-pointer"
        />

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
            {!user ? (
              <Link
                to="/signin"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Prijava
              </Link>
            ) : (
              <>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Odjava
                </button>

                <hr />

                <div className="px-4 py-2 text-gray-500 font-semibold text-sm">
                  Tvoji jelovnici
                </div>
                <MenusList userId={user.userId} />
              </>
            )}
          </div>
        )}
      </div>
        </ul>
      </header>
    );
  };
  
  export default Header;