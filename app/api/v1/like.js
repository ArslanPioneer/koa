const Router =require('koa-router')
const router = new Router(
    {
        prefix:'/v1/like'
    }
)
const {LikeValidator,DisLikeValidator} =require('../../validators/validator')
const {Auth} =require('../../../middlewares/auth')
const {Favor} =require('../../models/favor')

router.post('/',new Auth().m, async ctx =>{
        const v =await new LikeValidator().validate(ctx,{
            id:'art_id'
        })
        await Favor.like(ctx.auth.uid,v.get('body.type'),v.get('body.art_id'))
        throw new global.errs.Success('用户点赞成功')
})

 router.post('/cancel',new Auth().m,async ctx =>{
      const v =await new DisLikeValidator().validate(ctx,{
          id:'art_id'
      })
      await Favor.disLike(ctx.auth.uid,v.get('body.type'),v.get('body.art_id'))
      throw new global.errs.Success('用户取消点赞成功')
 })

module.exports= router