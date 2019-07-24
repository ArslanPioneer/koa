const util =require('util')
const axios =require('axios')
const {User} =require('../models/user')
const {generateToken} =require('../../core/util')
const {Auth} =require('../../middlewares/auth')
class WXmanager {
    static async codeToToken(code){
        //显示注册 唯一标识
        //code 
        //appid
        //appsecret
        const url =util.format(global.config.wx.LoginUrl,global.config.wx.AppID,global.config.wx.AppSecret,code)

        const result =await axios.get(url)

        if(result.status!==200){
            throw new global.errs.AuthFailed('openid获取失败')
        }

        if(result.data.errcode){
            throw new global.errs.AuthFailed('openid获取失败'+result.data.errmsg)
        }

        let user =await User.getUserByOpenid(result.data.openid)
        if(!user){
            user =await User.registerByOpenid(result.data.openid)
        }

        return generateToken(user.id,Auth.USER_MINI_PROGRAM)
    }
}

module.exports ={
    WXmanager
}