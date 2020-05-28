const bcrypt = require("bcryptjs");
const Router = require("koa-router");
const {
  RegisterValidator,
  LoginValidator,
  getUserListValidator,
} = require("../../validators/validator");
const { User } = require("../../models/user");

const router = new Router({
  prefix: "/v1/user",
});
//登录
router.post("/login", async (ctx) => {
  const v = await new LoginValidator().validate(ctx);
  const isUser = await User.verifyEmailPassword(
    v.get("body.email"),
    v.get("body.password")
  );
  if (isUser) {
    throw new global.errs.Success("登录成功");
  }
  //throw new global.errs.Success("登录成功");
});
//注册，新增数据
router.post("/register", async (ctx) => {
  //token jwt  无意义的随机字符串
  //先进校验器,校验参数
  const v = await new RegisterValidator().validate(ctx);
  //加密
  const salt = bcrypt.genSaltSync(10);
  //明文,加密不同
  //session考虑状态 无状态
  const psw = bcrypt.hashSync(v.get("body.password2"), salt);
  const user = {
    //获取body内的数据对象
    email: v.get("body.email"),
    password: psw,
    nickname: v.get("body.nickname"),
  };
  //向表中添加数据
  User.create(user);
  //
  throw new global.errs.Success("用户注册成功");

  //主题从粗到细
  //user
  //期刊粗
  //movie setence music
  //url update title
  //一期一期 model表 1期2期3期
  //实体表 记录本身相关信息\事物\表
  //Flow 具体实体,抽象，记录业务

  //实体表 实体
  //来设计 所有业务
});

router.post("/getUserList", async (ctx) => {
  const v = await new getUserListValidator().validate(ctx);
  const UserListData = await User.getUserList(
    v.get("body.page"),
    v.get("body.size")
  );
  ctx.body = {
    userList: UserListData.rows,
    count: UserListData.count,
  };
});

module.exports = router;
