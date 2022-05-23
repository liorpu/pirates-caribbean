import { useState } from 'react';
import Axios from 'axios'
import './App.css';
import { useNavigate } from "react-router-dom"

function Admin() {

  let navigate = useNavigate();

  //node js server name/ip for http requests
  const host = 'localhost';

  //states
  const [users, setUsers] = useState({});
  const [toDoList, setToDoList] = useState(false);
  const [contacts, setContacts] = useState(false);
  const [prosCons, setProsCons] = useState(false);
  const [newUser, setNewUser] = useState("")



  // storing selected user name
  const [selectedUserName, setSelectedUserName] = useState("")

  //*** users http requests functions ***

  //get request: getting users list
  const getUsers = () => {
    Axios.get('http://' + host + ':3001/users_get', {
    }).then((response) => {
      setUsers(response.data) 
      console.log("users:" + response.data[1].user)     
    });
  }

  //post request: reseting password for a given user
  const passwordReset = () => {
    Axios.post('http://' + host + ':3001/password_reset', {
      username: selectedUserName,
    }).then(() => {
      console.log(selectedUserName)
      console.log("success");
      
    });
  }
  
    //delete user
    const deleteUser = (userid) => {
      Axios.delete('http://' + host+ ':3001/user_delete',
      {
        params: {
          userid: userid
        }
      }).then((response) => {
        getUsers();
        console.log("userid is: " + userid)
      });
    }

  //post request: create user
  const createUser = () => {
    Axios.post('http://' + host + ':3001/user_create', {
      userName: newUser,
      contacts: contacts,
      prosCons: prosCons,
      toDoList: toDoList
    }).then(() => {
      console.log("success");
      getUsers();      
    });
  }

  return (
    <div className='App'>
        <div className='information' onLoad={getUsers}>
        <img src="/wheel.png" className='wheel'></img>
        <h2>Users Management</h2>
        <table>
          <div className='table-cell'>
          <input type="checkbox" checked={toDoList}
          onChange={
            (event) => {
              setToDoList(!toDoList)
              
            }
          }
          ></input>
          <label>To Do List</label>
          </div>
          <input type="checkbox" checked={contacts}
          onChange={
            (event) => {
              setContacts(!contacts)
              
            }
          }
          ></input>
          <label>Contacts</label>
          <input type="checkbox" checked={prosCons}
          onChange={
            (event) => {
              setProsCons(!prosCons)
              
            }
          }
          ></input>
          <label>Pros/Cons</label>
          
        </table>

        <label>New User:</label>
        <input
          type="text" 
          onChange={(event) => {
            setNewUser(event.target.value);
            }}
            ></input>
        <button onClick={createUser}>Add User</button> 

        <button onClick={passwordReset}>Password Reset</button>
        <button onClick={() => {
                navigate('/User/' + selectedUserName )}
              }
        >Browse User page</button>
        
        {Array.from(users).map((val,key) => {
          return (
          <div>

            <ul>
             
              <li className='tasks'>{val.user}
              <span class="close" onClick={() => {
                deleteUser(val.id);
                console.log("the val id is: " + val.id)
              
              }
              }
              >x</span>
              {console.log(selectedUserName) }                     
              <div class="radio">
              <input type="radio"
              
              value={val.user}              
              
              checked={selectedUserName == val.user}
              onChange={(event) => {
                setSelectedUserName(event.target.value);
                }}
                
              ></input>
              </div>
              </li>
            </ul>  
          </div>
                  );
        })}
      </div>
      
    </div>
  );
}

export default Admin;
