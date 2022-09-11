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
            <form id="login-form">
              <input type='text' name='student-firstname' placeholder="UserName" onChange={(e) => setUserName(e.target.value)} value={userName}></input>
              <input type='text' name='student-lastname' placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={setPassword}></input>
            </form>
          </div>
      </div>
    </>
  )
}

export default Login