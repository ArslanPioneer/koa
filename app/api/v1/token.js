const Router =require('koa-router')
const {TokenValidator,NotEmptyValidator} =require('../../validators/validator')
const {LoginType} =require('../../lib/enum')
const {User} =require('../../models/user')
const {generateToken} =require('../../../core/util')
const {Auth} =require('../../../middlewares/auth')
const {WXmanager} =require('../../../app/services/wx')
const router =new Router({
    prefix:'/v1/token'
})

router.post('/',async(ctx)=>{
    
    const v =await new TokenValidator().validate(ctx)
    //业务逻辑
    //1 在API接口编写
    //2 Model分层
    //MVC Model

    //业务分层 Model Service
    let token
    //登录方式
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token= await emailLogin(v.get('body.account'),v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WXmanager.codeToToken(v.get('body.account'))
            break;
        default:
            break;
    }
    ctx.body={
        token
    }
    //throw new global.errs.Success('成功')
})

router.post('/verify',async(ctx) =>{
    const v =await new NotEmptyValidator().validate(ctx)
    const result =Auth.verifyToken(v.get('body.token'))
    ctx.body ={
        result
    }
})

async function emailLogin (account,secret){
     
    const user = await User.verifyEmailPassword(account,secret)
    return generateToken(user.id,Auth.USER)
}

module.exports =router