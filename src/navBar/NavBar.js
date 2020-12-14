import React from 'react';
import "./NavBar.css";
import { Link } from "react-router-dom";
const NavBar = ()=>{
    return(
        <div className="navBar">

            <h3 className="logo">Book Mania</h3>
            <ul>
               <Link to="/"> <li class="listItem">Home</li></Link>
                <li class="listItem">About Us</li>
                <li class="listItem">Contact Us</li>
            </ul>

        </div>
    )
}
export default NavBar;