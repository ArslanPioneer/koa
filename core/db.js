const Sequelize =require('sequelize')

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName,user,password,{
    dialect:'mysql',
    host:host,
    port:port,
    logging:true,
    timezone:'+08:00',
    define:{

    }
})
sequelize.sync()
module.exports ={
    sequelize
}