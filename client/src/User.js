import { useState } from 'react';
import './App.css';
import Axios from 'axios'
import { useParams } from 'react-router-dom';

function User() {
  //current user name
  let {username} = useParams();

  const [toDoListPermissions, setToDoListPermissions] = useState('hidden');
  const [contactsPermissions, setContactsPermissions] = useState('hidden');
  const [prosConsPermissions, setProsConsPermissions] = useState('hidden');


  //node js server name/ip for http requests
  const host = 'localhost';

  //states
  const [userID, setUserId] = useState('');
  const [task, setTask] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState(0)
  const [pro, setPro] = useState('')
  const [con, setCon] = useState('')

  const [contacts, setContacts] = useState([])
  const [toDoList, setToDoList] = useState([])
  const [newTask, setNewTask] = useState('')

  const [userPermissions, setUserPermissions] = useState([])
  
//*** to do list http requests functions ***

  //get request: getting to do list for a given user
  const getToDoList = () => {
    Axios.get('http://' + host + ':3001/tdl_get', {
      params: {
        username: username
      }
    }).then((response) => {
      setToDoList(response.data)
      
    });
  }
  //post request: adding task for a given user
  const addTask = () => {
    
    Axios.post('http://' + host + ':3001/tdl_create', {
      userID: username,
      task: task
    }).then(() => {
      console.log("success");
      getToDoList();
    });
  }

  //delete one task
  const deleteTask = (id) => {
    Axios.delete('http://' + host+ ':3001/tdl_delete',
    {
      params: {
        id: id
      }
    }).then((response) => {
      getToDoList();
    });
  }
  
// *** contacts HTTP requests functions ***

  //get request: getting contact list for a given user
  const getContacts = () => {
    Axios.get('http://' + host + ':3001/contacts_get', {
      params: {
        username: username
      }
    }).then((response) => {
      setContacts(response.data)
    });
  }

  //post request: adding contact for a given user
  const addContact = () => {
    Axios.post('http://' + host + ':3001/contact_create', {
      userID: username,
      name: name,
      phone: phone
    }).then(() => {
      console.log("success");
      getContacts();
    });
  }

  //delete one contact
  const deleteContact = (id) => {
    Axios.delete('http://' + host + ':3001/contact_delete',
    {
      params: {
        id: id
      }
    }).then((response) => {
      getContacts();
    });
  }

  //  getting user permissions
  const getPermissions = () => {
    Axios.get('http://' + host + ':3001/get_permissions', {
      params: {
        username: username
      }
    }).then((response) => {
      setUserPermissions(response.data);

      if (Boolean(response.data[0].ToDoList) == true) {
        setToDoListPermissions("visible");
      }

      if (Boolean(response.data[0].contacts) == true) {
        setContactsPermissions("visible");
      }

      if (Boolean(response.data[0].proscons) == true) {
        setProsConsPermissions("visible");
      }
    
    });
  }
  
  // getting ToDoList, Contact and Pros/Cons items
    const getData = () => {
      getToDoList();
      getContacts();
      getPermissions();
    }

  return (

    
    <div className="App">

      <div className='information' onLoad={getData}>
        <img src="/lifebuoy.png" className='lifebuoy'></img>
        <h1>Welcome aboard {username}! :)</h1>

        {/* to do list */}
        <table style={{visibility: toDoListPermissions}}>
        {console.log("tdl per: " + toDoListPermissions)}
        <h2>Things you need to do ;)</h2>
        <label>Task:</label>
        <input
          type="text" 
          onChange={(event) => {
            setTask(event.target.value);
            }}
            ></input>
        <button onClick={addTask}>Add Task</button>        
        {toDoList.map((val,key) => {
          return (
          <div>
            <ul>
              <li className='tasks'>{val.task}
              <span class="close" onClick={() => {
                deleteTask(val.id)}
              }
              >x</span>         
              </li>
            </ul>       
          </div>
                  );
        })}
        </table>

        
        {/*/ contacts list */}
        <table style={{visibility: contactsPermissions}}>
        <h2>People you know ;=)</h2>
        <label>Name:</label>
        <input type="text"
        onChange={(event) => {
          setName(event.target.value);
          }}
        ></input>
        
        <label>Phone number:</label>
        <input type="number"
        onChange={(event) => {
          setPhone(event.target.value);
          }}
        ></input>
        <button onClick={addContact}>Add Contact</button>

        {contacts.map((val,key) => {
          return (
          <div>
            <ul>
              <li className='contacts'>{"📞 " +val.contactName + " | 0" + val.contactPhone}
              <span class="close" onClick={() => {
                deleteContact(val.id)}
              }
              >x</span>         
              </li>
            </ul>       
          </div>
                  );
        })}
        </table>
        {/*/ pros/cons list */}

        <table style={{visibility: prosConsPermissions}}>
        <h2>👍/👎</h2>
        <label></label>
        <input type="text"
        onChange={(event) => {
          setPro(event.target.value);
          }}
        ></input>
        <button>Add Pro</button>
        
        <input type="text"
        onChange={(event) => {
          setCon(event.target.value);
          }}
        ></input>
        <button>Add Con</button>
        </table>
        
      </div>
    </div>
  );
}

export default User;
