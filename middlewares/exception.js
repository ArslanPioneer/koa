const {HttpException} =require('../core/http-exception')
const catchError = async (ctx,next)=>{
    try {
        await next()
    } catch (error) {
        if(global.config.env === 'dev'){
            throw error
        }
        
        //error 堆栈调用信息
        // 简化清晰明了的信息
        //HTTP Status code 2xx 4xx 5xx
        if(error instanceof HttpException){
            ctx.body ={
                msg:error.msg,
                error_code:error.errorCode,
                request:`${ctx.method} ${ctx.path}`
            }
            //HTTP状态码
            ctx.status =error.code
        }

        else {
            ctx.body ={
                msg:'服务器内部错误',
                errorCode:9999,
                request:`${ctx.method} ${ctx.path}`
            }
            ctx.status =500
        }
       
        //message 
        //error_code 详细开发者定义 10001 
        //request_url

        //已知性错误 可以明确处理错误
        //未知性错误
        //连接数据库 账号 密码错了
    }
}

module.exports =catchError