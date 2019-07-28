const {sequelize} =require('../../core/db')

const {Sequelize,Model} =require('sequelize')
const {LikeError} =require('../../core/http-exception')
const {Art} =require('../models/art')

class Favor extends Model {
    //业务表
    static async like(uid,type,art_id){
        //添加记录
        //classic fav_nums
        //数据库事务 数据的一致性
        //ACID 原子性
        const favor =await Favor.findOne({
            where:{
                art_id,
                type,
                uid
            }
        })
        if(favor){
            throw new global.errs.LikeError()
        }
        
        return sequelize.transaction(async t=>{
           await Favor.create({
             art_id,
             type,
             uid
           },{transaction:t})

           const art =await Art.getData(art_id,type)
           await art.increment('fav_nums',{by:1,transaction:t})
        })
    }

    static async disLike(uid,type,art_id){

    }
}

Favor.init({
    uid:Sequelize.INTEGER,
    type:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER
},{
  sequelize:sequelize,
  tableName:'favor'
})

module.exports ={
  Favor
}