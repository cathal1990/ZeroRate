import React from 'react'
import { ParticleBackground } from "../components";

function Login() {
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');


  return (
    <>
      <ParticleBackground />
      <div className="login-container">
          <div className="login-form">
            <p>LOGIN</p>
            <form id="login-form">
              <input type='text' name='username' placeholder="UserName" onChange={(e) => setUserName(e.target.value)} value={userName}></input>
              <input type='password' name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            </form>
          </div>
      </div>
    </>
  )
}

export default Login