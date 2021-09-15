import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser ,setLoggedInUser]=useContext(UserContext);
    return (
        <div className="header">
            <img src={logo} alt="" />
            <nav>
            <Link to="/shop">Shop</Link>
            <Link to="/order">Order Review</Link>
            <Link to="/inventory">Manage Inventory</Link>
           <button onClick={()=> setLoggedInUser({})}>SignOut</button>
            </nav>

        </div>
    );
};

export default Header;