const { LinValidator, Rule } = require("../../core/lin-validator-v2");
const { User } = require("../models/user");
const { LoginType, ArtType } = require("../lib/enum");
//校验器,校验参数是否合规

class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super();
    this.id = [new Rule("isInt", "需要是正整数", { min: 1 })];
  }
}

class RegisterValidator extends LinValidator {
  constructor() {
    super();
    (this.email = [new Rule("isEmail", "需要是邮箱")]),
      (this.password1 = [
        new Rule("isLength", "密码至少6个字符，最多32个字符", {
          min: 6,
          max: 32,
        }),
        // new Rule(
        //   "matches",
        //   "密码不符合规范",
        //   "^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]"
        // ),
      ]),
      (this.password2 = this.password1),
      (this.nickname = [
        new Rule("isLength", "昵称不符合规范", {
          min: 4,
          max: 32,
        }),
      ]);
  }

  validatePassword(vals) {
    const psw1 = vals.body.password1;
    const psw2 = vals.body.password2;
    if (psw1 !== psw2) {
      throw new Error("输入的密码不一致");
    }
  }

  async validateEmail(vals) {
    const email = vals.body.email;
    //如果查找相同的email则抛出异常
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      throw new Error("email不能重复注册");
    }
  }
}

class TokenValidator extends LinValidator {
  constructor() {
    super();
    this.account = [
      new Rule("isLength", "不符合密码规则", {
        min: 4,
        max: 32,
      }),
    ];
    this.secret = [
      //可以为空 可以不传
      //web account + secret
      //微信小程序 account
      // tel
      new Rule("isOptional"),
      new Rule("isLength", "至少6个字符", {
        min: 6,
        max: 128,
      }),
    ];
  }

  validateType(vals) {
    if (!vals.body.type) {
      throw new Error("type必须是参数");
    }
    if (!LoginType.isThisType(vals.body.type)) {
      throw new Error("type参数不合法");
    }
  }
}

class NotEmptyValidator extends LinValidator {
  constructor() {
    super();
    this.token = [new Rule("isLength", "不允许为空", { min: 1 })];
  }
}

function checkArtType(vals) {
  let type = vals.body.type || vals.path.type;
  if (!type) {
    throw new Error("type是必须参数");
  }
  type = parseInt(type);

  if (!ArtType.isThisType(type)) {
    throw new Error("type参数不合法");
  }
}

class LikeValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    this.validateType = checkArtType;
  }
}

class DisLikeValidator extends LikeValidator {
  constructor() {
    super();
    this.validateType = checkArtType;
  }
}

class ClassicValidator extends LikeValidator {}

class SearchValidator extends LinValidator {
  constructor() {
    super();
    this.q = [new Rule("isLength", "搜索关键词不能为空", { min: 1, max: 16 })];

    (this.start = [
      new Rule("isInt", "start不符合规范", {
        min: 0,
        max: 60000,
      }),
      new Rule("isOptional", "", 0),
    ]),
      (this.count = [
        new Rule("isInt", "count不符合规范", {
          min: 1,
          max: 5,
        }),
      ]);
  }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
  constructor() {
    super();
    this.content = [
      new Rule("isLength", "必须在1到24个字符之间", {
        min: 1,
        max: 24,
      }),
    ];
  }
}

class LoginValidator extends LinValidator {
  constructor() {
    super();
    (this.email = [new Rule("isEmail", "需要是邮箱")]),
      (this.password = [
        new Rule("isLength", "密码至少6个字符，最多32个字符", {
          min: 6,
          max: 32,
        }),
      ]);
  }
}

class getUserListValidator extends LinValidator {
  constructor() {
    super();
    (this.page = [new Rule("isInt", "page是整数且不能为空")]),
      (this.size = [new Rule("isInt", "size是整数且不能为空")]);
  }
}

module.exports = {
  PositiveIntegerValidator,
  RegisterValidator,
  LoginValidator,
  TokenValidator,
  NotEmptyValidator,
  LikeValidator,
  DisLikeValidator,
  ClassicValidator,
  SearchValidator,
  AddShortCommentValidator,
  getUserListValidator,
};
