module.exports ={
    env:'dev',
    database:{
        dbName:'arslan',
        host:'localhost',
        port:3306,
        user:'root',
        password:'159753'
    },
    security:{
        //根密钥
        secretKey:'qwerdf',
        //过期时间
        expiresIn:60*60*24
    }
}