const Router =require('koa-router')
const router = new Router()
const {HttpException,ParameterException} =require('../../../core/http-exception')
const {PositiveIntegerValidator,ClassicValidator} =require('../../validators/validator')
const {Auth} =require('../../../middlewares/auth')
const {Flow} =require('../../models/flow')
const {Art} =require('../../models/art')
const {Favor} =require('@models/favor')

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
    const likeStatus =await Favor.userLikeIt(ctx.auth.uid,flow.type,flow.art_id)
    //js 序列化
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likeStatus)
    ctx.body =art
    //ctx.body =flow
    //权限 复杂
    //限制 token 角色
    //普通用户 管理员
    //序列化 对象json
     
 });
//获取下一期期刊
 router.get('/v1/classic/:index/next',new Auth().m,async (ctx,next) =>{
    const v = await new PositiveIntegerValidator().validate(ctx,{
        id:'index'
    })
    const index =v.get('path.index')
    const flow =await Flow.findOne({
        where:{
            index:index+1
        }
    })

    if(!flow){
        throw new global.errs.NotFound()
    }
    //数据库操作异步的
    const art =await Art.getData(flow.art_id,flow.type)
    const likeStatus=await Favor.userLikeIt(ctx.auth.uid,flow.type,flow.art_id)
    art.setDataValue('index',flow.index)
    art.setDataValue('like_status',likeStatus)
    ctx.body=art
 })

 //获取上一期期刊
 router.get('/v1/classic/:index/previous',new Auth().m, async(ctx,next)=>{
     const v =await new PositiveIntegerValidator().validate(ctx,{
         id:'index'
     })

     const index =v.get('path.index')
     const flow  =await Flow.findOne({
         where:{
             index:index-1
         }
     })

     if(!flow){
         throw new global.errs.NotFound()
     }

     const art =await Art.getData(flow.art_id,flow.type)
     const likeStatus =await Favor.userLikeIt(ctx.auth.uid,flow.type,flow.art_id)
     art.setDataValue('index',flow.index)
     art.setDataValue('like_status',likeStatus)
    //  art.exclude=['index','image','content']
     ctx.body =art
 })
//获取期刊点赞信息
 router.get('/v1/classic/:type/:id/favor',new Auth().m, async(ctx,next) =>{
    const v =await new ClassicValidator().validate(ctx)
    const id =v.get('path.id')

    const type =parseInt(v.get('path.type'))
    //类方法 静态方法
    const art =await Art.getData(id,type)
    if(!art){
        throw new global.errs.NotFound()
    }
    
    const likeStatus = await Favor.userLikeIt(ctx.auth.uid,type,id)

    ctx.body ={
        fav_nums:art.fav_nums,
        like_status:likeStatus
    }
 })

 router.get('/v1/classic/:type/:id',new Auth().m,async(ctx,next)=>{
        const v =await new ClassicValidator().validate(ctx)
        const id = v.get('path.id')
        const type =parseInt(v.get('path.type'))
        
        const artDetail = await new Art(id,type).getDetail(ctx.auth.uid)
        artDetail.art.setDataValue('like_status',artDetail.like_status)
       
        ctx.body = artDetail.art
 })

 router.get('/v1/classic/favor',new Auth().m ,async(ctx,next) =>{
        const uid =ctx.auth.uid
        const favors =await Favor.getMyclassicFavors(uid)
        ctx.body = favors
 })
module.exports = router