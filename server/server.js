const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require("cors")

app.use(cors())
app.use(express.json())

//mysql database connection
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'sababa@1',
    database: 'piratesCaribbean'
});

//display server status message via web and console
app.get("/", (req, res) => {
    res.send("<h2>Hi There :)</h2>");
});

app.listen(3001, () => {
    console.log("Arr pirate! your boat is sailing and your server is running!")
});

// *** ToDoList HTTP Request Methods ***

//create new task for a given user
app.post('/tdl_create', (req, res) => {
    
    const userID = req.body.userID;
    const task = req.body.task;

    db.query('INSERT INTO ToDoList (user, task) VALUES(?,?)', [userID, task],
    (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        res.send("Values Inserted")
        }
    });

});

//get all task in the db for a given user
app.get('/tdl_get', (req, res) => {
    const username = req.query.username;
    db.query('SELECT * FROM ToDoList WHERE user LIKE ?', [username], (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});

//update task in the db for for a given user
app.put('/tdl_update', (req, res) => {
    const tdl_id = req.body.tdlid;
    const task = req.body.task;
    db.query("UPDATE ToDoList SET task = ? WHERE id = ?", [task, tdl_id],
    (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    }
  );
});

//delete task in the db
app.delete('/tdl_delete', (req, res) => {
    const tdl_id = req.query.id
    db.query('DELETE FROM ToDoList WHERE id = ?', tdl_id, (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});



// *** Contacts Table HTTP Request Methods ***

//create new contact for a given user
app.post('/contact_create', (req, res) => {
    const userID = req.body.userID;
    const name = req.body.name;
    const phone = req.body.phone;

    db.query('INSERT INTO contacts (user, contactName, contactPhone) VALUES(?,?,?)', [userID, name, phone],
    (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        res.send("Values Inserted")
        }
    });

});

//get all contacts in the db for a given user
app.get('/contacts_get', (req, res) => {
    const username = req.query.username;
    db.query('SELECT * FROM contacts WHERE user LIKE ?', [username], (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});

//delete contact in the db
app.delete('/contact_delete', (req, res) => {
    const contact_id = req.query.id
    db.query('DELETE FROM contacts WHERE id = ?', contact_id, (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});

// *** login request - check for user name and password
app.post('/login', (req, res) => {
    
    const username = req.body.username;
    const password = req.body.password;

    db.query('SELECT * from users WHERE user = ? AND password = ?', [username, password],
    (err, result) => {
    if (err) {
        res.send({err: err})
    }
    if (result.length > 0) {
        res.send(result)
            } else {
                res.send({ message: "Wrong User Name or Password" });
        }
        
    });

});


// *** users Table HTTP Request Methods ***
 

//get all users in the db table users
app.get('/users_get', (req, res) => {
    db.query('SELECT * FROM users', (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});



//reset password to 12345 for a given user
app.post('/password_reset', (req, res) => {
    const username = req.body.username;

    db.query('UPDATE users SET password = 12345 WHERE (user = ?)', username,
    (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        res.send("Values Inserted")
        }
    });

});

//delete user in the db
app.delete('/user_delete', (req, res) => {
    const userid = req.query.userid;
    db.query('DELETE FROM users WHERE (id = ?)', [userid], (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});

//create new user
app.post('/user_create', (req, res) => {
    
    const userName = req.body.userName;
    const contacts = req.body.contacts;
    const prosCons = req.body.prosCons;
    const toDoList = req.body.toDoList;
    db.query('INSERT INTO users (user, password, ToDoList, contacts, proscons, admin) VALUES(?,?,?,?,?,?)', [userName, '12345', toDoList, contacts, prosCons, '0'],
    (err, result) => {
    if (err) {
        console.log(err)
    }
    else {
        res.send("Values Inserted")
        }
    });

});

//get permissions for a given user
app.get('/get_permissions', (req, res) => {
    const username = req.query.username;
    db.query('SELECT * FROM users WHERE user LIKE ?', [username], (err,result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
});