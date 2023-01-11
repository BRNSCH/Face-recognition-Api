const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');


const db = knex ({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        port: 5432,
        user: 'postgres',
        password: "7897939",
        database: 'smart-brain'
    }
});


// 5432
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
   
    db("users")
        .returning("*") 
        .insert({
           
        email: email,
        name: name,
        joined: new Date()

    })
        .then(user => {
            res.json(user[0])
        })
        .catch(err => res.status(400).json('unable to register'))
    
})


app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    
    db.select('*').from('users').where({id})
        .then(user => { 
            if (user.length) {
                res.json(user[0])
            } else {
            res.status(404).json('Not found')
            
        }            
        })
       .catch(err => res.status(400).json('error getting user'))
    
})

app.put('/image', (req, res) => { 
    const { id } = req.body;

    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries ')
        .then(entries => {
            res.json(entries[0].entries);
        })
    .catch(err => res.status(400).json('unable to get count'));
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