import './App.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"
import Axios from 'axios'


function Admin() {
  let navigate = useNavigate();
  //node js server name/ip for http requests
  const host = 'localhost';

  //states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("")
  
  //login request function
  const login = () => {
    Axios.post("http://" + host + ':3001/login', {
      username: username,
      password: password
    }).then((response) => {
      if (response.data.message) {
        setLoginStatus(response.data.message)
      }
      else {
        setLoginStatus(response.data[0].user)
        if (response.data[0].user == 'Admin') {
          navigate('/Admin');
        }
      }
      console.log(response.data)
    });
  }

  return (
    <div className="App">

<div className='information'>
        
        <img src="/wheel.png" className='wheel'></img>
        <h1>Ahoy Captain! :)</h1>
        <input type="text" placeholder='Username'
           onChange={(event) => {
            setUsername(event.target.value);
            }}
        ></input>
        <input type="password" placeholder='Password'
          onChange={(event) => {
            setPassword(event.target.value);
            }}
        ></input>
        <button onClick={() => {login()}}>Login</button>        
            <h3>{loginStatus}</h3>
          </div>

    </div>
  );
}

export default Admin;
