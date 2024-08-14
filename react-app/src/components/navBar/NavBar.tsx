import { FaArrowRight } from 'react-icons/fa6';
import './NavBar.css';
import { IoGrid } from 'react-icons/io5';
import { LuNewspaper, LuWallet2 } from "react-icons/lu";
import { BsFileEarmarkBarGraph } from "react-icons/bs";

function NavBar() {
    return (
        <div className="nav-bar">
            <img src="https://images.unsplash.com/photo-1707928373566-6a8ac1308d9a?q=80&w=1546&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" className="Logo" />
            <IoGrid className="nav-btn" />
            <LuWallet2 className="nav-btn" />
            <LuNewspaper className="nav-btn" /> 
        </div>
    )
};

export default NavBar;