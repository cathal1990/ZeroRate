import React from 'react'
import { ParticleBackground } from "../components";
import '../less/index.css'
import logo from '../images/ZRnew.png'

function Login() {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    let loginObj = {
      username: userName,
      password: password,
    }


  }

  return (
    <>
      <ParticleBackground />
      <img id="logo" src={logo} />
      <div className="login-container">
          <div className="login-form">
            <p>ZeroRate</p>
            <form id="login-form" onSubmit={handleSubmit}>
              <input type='text' name='username' placeholder="UserName" onChange={(e) => setUserName(e.target.value)} value={userName}></input>
              <input type='password' name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            </form>
            <button type='submit'>Login</button>
          </div>
      </div>
    </>
  )
}

export default Login