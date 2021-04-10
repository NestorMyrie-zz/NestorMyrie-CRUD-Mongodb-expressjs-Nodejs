const mongoose = require('mongoose')
const config = require('config')
mongoose.connect(config.get('dba'),{useNewUrlParser:true,useUnifiedTopology:true})
mongoose.connection.on('open',() => {
  console.log('conectado a la base de datos')
})

module.exports = mongoose