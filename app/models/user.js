const bcrypt =require('bcryptjs')
const {sequelize} =require('../../core/db')

const {Sequelize,Model} =require('sequelize')
 
class User extends Model {
    static async verifyEmailPassword(email,plainPassword){
        const user =await User.findOne({
            where:{
                email
            }
        })
        if(!user){
             throw new global.errs.AuthFailed('用户不存在')
        }

        const correct =bcrypt.compareSync(plainPassword,user.password)
        
        if(!correct){
            throw new global.errs.AuthFailed('密码不正确')
        }
         
        return user
    }
    static async getUserByOpenid(openid){
        const user =await User.findOne({
            where:{
                openid
            }
        })

        return user
    }

    static async registerByOpenid(openid){
        return await User.create({
            openid
        })

         
    }
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
    email:{
        type:Sequelize.STRING(64),
        //独一无二的
        unique:true
    },
    openid:{
        type:Sequelize.STRING(64),
        unique:true
    },
    //添加字段名先删除原表再添加
    test:Sequelize.STRING
},{
    sequelize:sequelize
})

module.exports ={
    User
}