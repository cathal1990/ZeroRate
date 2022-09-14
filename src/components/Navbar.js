import React from 'react'
import logo from '../images/ZRblend1.png'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav id="navbar">
        <Link to="/dashboard"><img id="navbar-logo" src={logo} /></Link>
        <div className="navbar-links">
            <Link to="/dashboard">Trade opps</Link>
            <Link to="/dashboard/coin-analysis">Coin analysis</Link>
        </div>
        <Link to="/" id="logout">Logout</Link>
    </nav>
  )
}

export default Navbar