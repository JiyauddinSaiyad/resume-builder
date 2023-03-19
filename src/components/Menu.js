import { useState } from "react";
import "./Menu.css";
import logo from "../assets/mainLogo.png"
import { FaBars, FaHome, FaGithub, FaLinkedin, FaLink } from "react-icons/fa";


function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu-container">
            <button className="menu-toggle" onClick={toggleMenu}>
                <FaBars />
            </button>
            <nav className={`menu ${isOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <a href="#">
                            <img src={logo}></img>
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/JiyauddinSaiyad" target="__blank">
                            <FaGithub />
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/jiyauddin-saiyad/" target="__blank">
                            <FaLinkedin />
                        </a>
                    </li>
                    <li>
                        <a href="https://jiyauddinsaiyad.github.io/" target="__blank">
                            <FaLink />
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Menu;
