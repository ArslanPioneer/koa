const Router =require('koa-router')
const router = new Router(
    {
        prefix:'/v1/book/'
    }
)
const {HotBook} =require('../../models/hotBook') 
const {PositiveIntegerValidator,ClassicValidator,SearchValidator,AddShortCommentValidator} =require('../../validators/validator')
const {Book} =require('../../models/book')
const {Favor} =require('../../models/favor')
const {Comment} =require('../../models/bookComment')
const {Auth} =require('../../../middlewares/auth')
router.get('hotList', async (ctx,next)=>{
    const hotBook = await HotBook.getAll()
    ctx.body ={
        books:hotBook
    }
})

router.get(':id/detail',async(ctx,next)=>{
    const v =await new PositiveIntegerValidator().validate(ctx)
    const book =await new Book(v.get('path.id')).Detail()
    ctx.body ={
        book
    }
})

router.get('search',async(ctx)=>{
    const v  =await new SearchValidator().validate(ctx)
    const result  =await Book.search(v.get('query.q'),v.get('query.count'),v.get('query.start'))
    ctx.body =result
})

router.get('favor/count' ,new Auth().m,async (ctx) =>{
    const count  =await Book.getBookFavorNums(ctx.auth.uid)
    ctx.body ={
        count:count
    }
})

router.get(':book_id/favor',new Auth().m ,async(ctx)=>{
    const v =await new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })
    const favor =await Favor.getBookFavor(ctx.auth.uid,v.get('path.book_id'))
    ctx.body =favor
})

router.post('add/short_comment',new Auth().m,async ctx =>{
    const v =await new AddShortCommentValidator().validate(ctx,{
        id:'book_id'
    })

    await Comment.addComment(v.get('body.book_id'),v.get('body.content'))
     
    throw new global.errs.Success('用户添加短评成功')
})

router.get(':book_id/short_comment',new Auth().m,async ctx =>{
    const v  =  await new PositiveIntegerValidator().validate(ctx,{
        id:'book_id'
    })

    const comments=await Comment.getComment(v.get('path.book_id'))
    
    ctx.body =comments
})

 

module.exports = router