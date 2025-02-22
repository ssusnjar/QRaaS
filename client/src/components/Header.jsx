import Logo from '../assets/QRaaS.png';
import { Link } from "react-router-dom";

const Header = () => {
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
        </ul>
      </header>
    );
  };
  
  export default Header;