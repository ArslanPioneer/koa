const Router =require('koa-router')
const {TokenValidator} =require('../../validators/validator')
const {LoginType} =require('../../lib/enum')
const {User} =require('../../models/user')
const router =new Router({
    prefix:'/v1/token'
})

router.post('/',async(ctx)=>{
    
    const v =await new TokenValidator().validate(ctx)
    console.log(v)
    let type =v.get('body.type')
    let secret =v.get('body.secret')
    let account =v.get('body.account')
    switch (type) {
        case LoginType.USER_EMAIL:
            await emailLogin(account,secret)
            break;
        case LoginType.USER_MINI_PROGRAM:
            break;
        default:
            break;
    }
})

async function emailLogin (account,secret){
    console.log(account)
    console.log(secret)
    const user = await User.verifyEmailPassword(account,secret)
}

module.exports =router