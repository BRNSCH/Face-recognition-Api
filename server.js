const express = require('express');



const app = express();
app.use(express.json());
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
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => { 
    if (
        req.body.email === database.users[0].email
        &&
        req.body.password === database.users[0].password
    ) {
        res.json('Success')
    } else {
        res.status(400).json('Error logging in')
    }
    res.json('signin')
})

app.post('/register', (req, res) => { 
    const { email, name, password } = req.body;
    database.users.push(
         {
            id: "125",
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        })
    res.json(database.users[database.users.length - 1])
})

app.get('/profile:id', (req, res) => {
    const { id } = req.params;
    database.users.forEach(user => { 
        if (user.id === id) {
    
      }
} )
app.listen(3001, () => {
    console.log('app tá de oio na porta 3001');
})