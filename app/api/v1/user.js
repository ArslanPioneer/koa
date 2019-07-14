const bcrypt =require('bcryptjs')
const Router =require('koa-router')
const {RegisterValidator} =require('../../validators/validator')
const {User} =require('../../models/user')
const router =new Router({
    prefix:'/v1/user'
})
//注册，新增数据
router.post('/register',async(ctx)=>{
    //先进校验器,校验参数
    const v =await new RegisterValidator().validate(ctx)
    //加密
    const salt =bcrypt.genSaltSync(10)
    //明文,加密不同
    const psw  =bcrypt.hashSync(v.get('body.password2'),salt)
    const user = {
        //获取body内的数据对象
        email:v.get('body.email'),
        password:psw,
        nickname:v.get('body.nickname')

    }
    //向表中添加数据
    User.create(user)
    ctx.body = 'success'
})  

 module.exports =router