const { Sequelize, Model } = require("sequelize");
const { unset, clone, isArray } = require("lodash");
// const {
//   dbName,
//   host,
//   port,
//   user,
//   password,
// } = require("../config/config").database;
let database;
if (process.env.NODE_ENV === "production") {
  console.log("production");
  database = {
    dbName: "arslan",
    host: "119.45.0.151",
    port: 3306,
    user: "root",
    password: "123456",
  };
}

if (process.env.NODE_ENV === "development") {
  console.log("development");
  database = {
    dbName: "arslan",
    host: "localhost",
    port: 3306,
    user: "root",
    password: "159753",
  };
}
const sequelize = new Sequelize(
  database.dbName,
  database.user,
  database.password,
  {
    dialect: "mysql",
    host: database.host,
    port: database.port,
    logging: true,
    timezone: "+08:00",
    define: {
      //create_time生成时间 update_time更新时间
      timestamps: true,
      paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      // 将自动设置所有属性的字段参数为下划线命名方式.
      // 不会覆盖已经定义的字段选项
      underscored: true,
    },
  }
);
//自动化注册模型
sequelize.sync();

Model.prototype.toJSON = function () {
  //浅拷贝
  let data = clone(this.dataValues);
  unset(data, "created_at");
  unset(data, "deleted_at");
  unset(data, "updated_at");

  if (isArray(this.exclude)) {
    this.exclude.forEach((item) => {
      unset(data, item);
    });
  }

  return data;
};
module.exports = {
  sequelize,
};
