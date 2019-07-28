const Router =require('koa-router')
const router = new Router()
const {HttpException,ParameterException} =require('../../../core/http-exception')
const {PositiveIntegerValidator} =require('../../validators/validator')
const {Auth} =require('../../../middlewares/auth')
const {Flow} =require('../../models/flow')
const {Art} =require('../../models/art')
//校验防止非法参数
//获取路径里的参数也就是:id
router.post('/v1/:id/classic/path', (ctx, next) => {
    const path =ctx.request.path
    const v = new PositiveIntegerValidator().validate(ctx)
    v.get(path.id)
    // ctx.body ={
    //     key:'classic'
    // }
    // throw new Error('error')
});
//获取query 也就是?后面的参数
router.get('/v1/classic/query', async(ctx, next) => {
  
   const query =ctx.request.query
   const v = await new PositiveIntegerValidator() 
   v.validate(ctx)
   //validator获取参数
   v.get('query.id')
//    if(query.id===''){
//        const error =new ParameterException('商品id不能',10001,400)
       
//        throw error
//    }
//    ctx.body ={
//        key:'classic'
//    }
    
});
//获取header 比如token
router.get('/v1/classic/header', (ctx, next) => {
    
   const header =ctx.request.header
   console.log(header)
   ctx.body ={
       key:'classic'
   }
});

router.post('/v1/classic/post', (ctx, next) => {
    
    const body =ctx.request.body
    console.log(body)
    ctx.body ={
        key:'classic'
    }
 });

 router.get('/v1/classic/latest',new Auth().m, async (ctx, next) => {

    const flow =await Flow.findOne({
        order:[['index','DESC']]
    })
    const art=await Art.getData(flow.art_id,flow.type)
    //js 序列化
    art.setDataValue('index',flow.index)
    ctx.body =art
    //ctx.body =flow
    //权限 复杂
    //限制 token 角色
    //普通用户 管理员
    //序列化 对象json
     
 });
module.exports = router