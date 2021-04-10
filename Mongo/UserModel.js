const {Schema, model} = require('mongoose')
const connection = require('./conection')


const UserModel = new Schema({
    Nombre:{
        type:String,
        default:'Campo Vacio'
    },
    Edad:{
        type:Number,
        default:18
    }
})
module.exports = model('usuario',UserModel)
