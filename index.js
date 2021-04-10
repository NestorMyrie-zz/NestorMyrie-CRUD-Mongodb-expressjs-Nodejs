const { static } = require('express')
const express = require('express')
const UserModel= require('./Mongo/UserModel')
const app = express()
const port = 3000
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static((__dirname +"/Public")) )
app.get('/Users',(req,res) => {
    UserModel.find().then((doc) => {
      res.json(doc)
    })

})
app.post('/delete/:id',(req,res) => {

    let id = req.params.id
    UserModel.findByIdAndDelete({_id: id}).then(() => {
      res.send('Listo')
    }).catch(() => {
      console.log('No se pudo borrar el Usuarios')
    })
  
})

app.post('/add',(req,res) => {
    const newUser =new UserModel({
        Nombre: req.body.Nombre,
        Edad:req.body.Edad
    })
    newUser.save().then((doc)=>{
      res.json({Status:'Success'})
    }).catch(err => console.log(' error, linea 32'))

})

app.post('/update/:id/:nombre',(req,res) => {
    const nombre = req.params.nombre
    let id = req.params.id

    UserModel.findByIdAndUpdate({_id:id},{$set :{Nombre:nombre}}).then(() => {
      res.send('Se actualizo')
    })
})

app.listen(port,() => {
  console.log('Servidor arriba')
})