const {Sequelize,Model} =require('sequelize')
const {unset} =require('lodash')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host: host,
    port: port,
    logging: true,
    timezone: '+08:00',
    define: {
        //create_time生成时间 update_time更新时间
        timestamps: true,
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        // 将自动设置所有属性的字段参数为下划线命名方式.
        // 不会覆盖已经定义的字段选项
        underscored: true,
        
    }
})
//自动化注册模型
sequelize.sync()
Model.prototype.toJSON =function(){
    let data = clone(this.dataValues)
    unset(data,'created_at')
    unset(data,'deleted_at')
    unset(data,'updated_at')
    return data
}
module.exports = {
    sequelize
}