module.exports = {
  env: "dev",
  // database: {
  //   dbName: "arslan",
  //   host: "119.45.0.151",
  //   port: 3306,
  //   user: "root",
  //   password: "123456",
  // },
  security: {
    //根密钥
    secretKey: "qwerdf",
    //过期时间
    expiresIn: 60 * 60 * 24,
  },
  wx: {
    AppID: "wxc4b1225cd546ef68",
    AppSecret: "4a5744ddd5d420deaed1be1ae323c9a8",
    LoginUrl:
      "https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code",
  },
  yushu: {
    detailUrl: "http://t.yushu.im/v2/book/id/%s",
    keywordUrl:
      "http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s",
  },
};
