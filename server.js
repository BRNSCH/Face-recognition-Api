const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors())
const database = {
    users: [
        {
            id: "123",
            name: "John",
            email: 'john@gmail.com',
            password: "bolos",
            entries: 0,
            joined: new Date()
        },
        {
            id: "124",
            name: "Jane",
            email: 'jane@gmail.com',
            password: "tortas",
            entries: 0,
            joined: new Date()
        },
    ],
    login: [
        {
            id: '080',
            hash: '',
            email:'john@gmail.com'
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {   
    
    bcrypt.compare("cafe",
        '$2a$10$MtuCmGc/hLzBEpzQG3wWjuv1iB.GE5XoJcvO4vbsYl6VeN9y.VXCC',
        function (err, res) {
            // res == true
        console.log('first guess', res)
        });
    bcrypt.compare("veggies",
        '$2a$10$MtuCmGc/hLzBEpzQG3wWjuv1iB.GE5XoJcvO4vbsYl6VeN9y.VXCC',
        function (err, res) {
        // res = false
        console.log('second guess', res)
    });
    if (
        req.body.email === database.users[0].email
        &&
        req.body.password === database.users[0].password
    ) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('Error logging in')
    }
    res.json('signin')
})

app.post('/register', (req, res) => { 
    const { email, name, password } = req.body;
    // bcrypt.hash(password, null, null, function (err, hash) {
    //     // Store hash in your password DB.
    //     console.log(hash);
    // });
    database.users.push(
         {
            id: "125",
            name: name,
            email: email,            
            entries: 0,
            joined: new Date()
        })
    res.json(database.users[database.users.length - 1])
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            return res.json(user);
            found: true;
        } 
    })
    if (!found) { 
        res.status(400).json("NOT FOUND");
    }
})

app.put('/image', (req, res) => { 
    const { id } = req.body;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found: true;
            user.entries++
            return res.json(user.entries);
            
        }
    })
    if (!found) {
        res.status(400).json("NOT FOUND");
    }
})
    
// bcrypt.hash("bacon", null, null, function (err, hash) {
//     // Store hash in your password DB.
// });

// Load hash from your password DB.
// bcrypt.compare("bacon", hash, function (err, res) {
//     // res == true
// });
// bcrypt.compare("veggies", hash, function (err, res) {
//     // res = false
// });

app.listen(3001, () => {
    console.log('app tá de oio na porta 3001');
})