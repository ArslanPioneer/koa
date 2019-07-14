const {sequelize} =require('../../core/db')

const {Sequelize,Model} =require('sequelize')

class User extends Model {

}

User.init({
    id:{
        type:Sequelize.INTEGER,
        //主键
        primaryKey:true,
        //自动增长id编号
        autoIncrement:true
    },
    nickname:Sequelize.STRING,
    password:Sequelize.STRING,
    email:Sequelize.STRING,
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    }
},{
    sequelize:sequelize
})