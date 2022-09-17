import React from 'react'
import logo from '../images/ZRblend1.png'
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    window.localStorage.removeItem('token');
    navigate('/')
}
  return (
    <nav id="navbar">
        <Link to="/dashboard"><img id="navbar-logo" src={logo} alt="ZeroRate"/></Link>
        <div className="navbar-links">
            <Link to="/dashboard">Trade opps</Link>
            <Link to="/dashboard/coin-analysis">Rate analysis</Link>
        </div>
        <Link to="/" id="logout" onClick={logout}>Logout</Link>
    </nav>
  )
}

export default Navbar