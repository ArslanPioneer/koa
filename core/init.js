const Router = require('koa-router')
const requireDirectory = require('require-directory');
class InitManager {
    static initCore(app){
        //入口方法
        InitManager.app =app
        InitManager.initLoadRouters()
        InitManager.initException()
        InitManager.loadingConfig()
    }
    //初始化环境
    static loadingConfig(path=''){
        const configPath =path || process.cwd()+'/config/config.js'
        const config =require(configPath)
        global.config =config
    }
    //初始化路由   
    static initLoadRouters() {
        //自动化注册路由
        //path config
        const apiConfig =`${process.cwd()}/app/api`
        requireDirectory(module, apiConfig, {
            visit: whenLoadModule
        })
        function whenLoadModule(obj) {
            //如果对象是Router类型则注册该路由
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    //初始化全局异常
    static initException(){
        const error =require('../core/http-exception')
        //放在全局变量中
        global.errs =error
    }
}

module.exports = InitManager