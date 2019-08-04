const Router =require('koa-router')
const router = new Router(
    {
        prefix:'/v1/book/'
    }
)
const {HotBook} =require('../../models/hotBook') 
const {PositiveIntegerValidator,ClassicValidator,SearchValidator} =require('../../validators/validator')
const {Book} =require('../../models/book')
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
module.exports = router