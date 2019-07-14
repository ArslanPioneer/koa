const {LinValidator,Rule} =require('../../core/lin-validator-v2')
const {User} =require('../models/user')
//校验器,校验参数是否合规

class PositiveIntegerValidator extends LinValidator {
    constructor(){
        super()
        this.id = [
            new Rule('isInt','需要是正整数',{min:1})
        ]
    }
}

class RegisterValidator extends LinValidator {
    constructor(){
        super()
        this.email = [
            new Rule('isEmail','需要是邮箱')
        ],
        this.password1= [
            new Rule('isLength','密码至少6个字符，最多32个字符',{min:6,max:32}),
            new Rule('matches','密码不符合规范','^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
        ],
        this.password2 =this.password1,
        this.nickname =[
            new Rule('isLength','昵称不符合规范',{
                min:4,
                max:32
            })
        ]
    }

    validatePassword(vals){
        const psw1 =vals.body.password1
        const psw2 =vals.body.password2
        if(psw1 !==psw2){
            throw new Error('输入的密码不一致')
        }
    }

   async validateEmail(vals){
        const email =vals.body.email
        //如果查找相同的email则抛出异常
        const user =await User.findOne({
            where:{
                email:email
            }
        })
        if(user){
            throw new Error('email不能重复注册')
        }
    }
}

module.exports ={
    PositiveIntegerValidator,
    RegisterValidator
}