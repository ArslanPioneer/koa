class HttpException extends Error {
    constructor (msg='服务器异常',errorCode=10000,code=400) {
        super()
        this.errorCode =errorCode
        this.code =code
        this.msg =msg
    }
}

class ParameterException extends HttpException {
    constructor(msg,errorCode){
        super()
        this.code=400
        this.errorCode=10000||errorCode
        this.msg =msg
    }
}

class Success extends HttpException {
    constructor(msg,errorCode){
        super()
        this.code=200
        this.msg =msg || 'ok'
        this.errorCode =errorCode || 0
    }
}

class NotFound extends HttpException {
    constructor(msg,errorCode){
        super()
        this.code=404
        this.msg =msg || '未找到资源'
        this.errorCode =errorCode || 10000
    }
}

class AuthFailed extends HttpException {
    constructor(msg,errorCode){
        super()
        this.code=401
        this.msg =msg || '授权失败'
        this.errorCode =errorCode || 10004
    }
}
module.exports ={
    HttpException,
    ParameterException,
    Success,
    NotFound,
    AuthFailed
}