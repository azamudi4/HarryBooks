const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express();
const user = require('./registro')

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))

app.use(express.static(path.join(__dirname, 'public')))

const mongo_uri = 'mongodb+srv://user:<oL2IxIRSLZGFOHMI>@cluster0.nnbdw.mongodb.net/HarryBooks?retryWrites=true&w=majority'

mongoose.connect(mongo_uri, function(err){
    if (err) {
        throw err
    }else{
        console.log(`Conectado a  ${mongo_uri}`)
    }
})

app.post('/register', (req, res) =>{
    const {email, password} = req.body
    const user = new user({email, password})
    user.save(err =>{
        if (err) {
            res.status(500).send('Error al registrar el usuario')
        } else {
            res.status(200).send('Registro exitoso')
        }
    })
})
app.post('/authenticate', (req, res) =>{
    const {email,password} = req.body

    user.findOne({email} (err, user)) =>{
        if (err) {
            res.status(500).send('Error al autenticar')
        } else if (!user){
            res.status(500).send('Usuario incorrecto')
        }else{
            user.isCorrectPassword(password, (err, result)=>{
                if (err) {
                    res.status(500).send('Error al autenticar')
                } else if (result) {
                    res.status(200).send('Usuario autenticado correctamente')
                }else{
                    res.status(500).send('Usuario y/o contraseña incorecta')
                }
            })
        }
    }
})
app.listen(3000, () =>{
    console.log('server started')
})
module.exports = app