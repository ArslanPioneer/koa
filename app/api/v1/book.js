const Router =require('koa-router')
const router = new Router()
router.get('/book/latest', (ctx, next) => {
    // ctx.router available
    ctx.body ={
        key:'book'
    }
});

module.exports = router