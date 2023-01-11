const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');


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




app.post('/signin', signin.handleSignin(db,bcrypt) )
app.post('/register',(req,res) =>{register.handleRegister(req,res,db,bcrypt)})
app.get('/profile/:id',(req,res) =>{profile.handleProfileGet(req,res,db)})
app.put('/image', (req, res) => {image.handleImage(req,res,db)})
    
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