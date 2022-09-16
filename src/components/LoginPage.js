import React from 'react'
import { ParticleBackground } from "../components";
import '../less/index.css'
import logo from '../images/ZRblend1.png'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


function Login() {
  const userRef = React.useRef();
  const errRef = React.useRef();
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [errMsg, setErrMsg] = React.useState('');
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    userRef.current.focus();
  }, [])

  React.useEffect(() => {
    setErrMsg('');
  }, [userName, password])


  const handleSubmit = async(e) => {
    e.preventDefault();
    let loginObj = {
      username: userName,
      password: password,
    }
    try {
      const auth = await axios.post('/api/auth', loginObj)
      const { token } = auth.data
      window.localStorage.setItem('token', token);
      setUserName('');
      setPassword('');

      navigate('/dashboard')
    }
    catch(error) {
      console.log(error)
      setErrMsg('Unauthorized login')
      errRef.current.focus();
    }
  }

  return (
    <>
      <ParticleBackground />
      <img id="logo" src={logo} />
      <div className="login-container">
          <div className="login-form">
            <p id='login-failed' ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <p>ZeroRate</p>
            <form id="login-form" onSubmit={handleSubmit}>
              <input type='text' name='username' ref={userRef} autoComplete="off" placeholder="UserName" onChange={(e) => setUserName(e.target.value)} value={userName} required></input>
              <input type='password' name='password' placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required></input>
            <button>Login</button>
            </form>
          </div>
      </div>
    </>
  )
}

export default Login