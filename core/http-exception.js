class HttpException extends Error {
    constructor (msg='服务器异常',errorCode=10000,code=400) {
        //super()
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
module.exports ={
    HttpException,
    ParameterException
}