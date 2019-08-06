const {sequelize} =require('../../core/db')
const {Sequelize,Model,Op} =require('sequelize')
const util =require('util')
const axios =require('axios')
const {Favor} =require('../models/favor')
class Book extends Model {
    constructor(id){
        super()
        this.id =id
    }

    async Detail(){
        const url =util.format(global.config.yushu.detailUrl,this.id)
        const detail=await axios.get(url)
        return detail.Data
    }

    static async search(q,count,start,summary=1){
        const url  = util.format(global.config.yushu.keywordUrl,encodeURI(q),count,start,summary)
        const result = await axios.get(url)
        return result.data
    }

    static async getBookFavorNums(uid){
        const count =await Favor.count({
            where:{
                uid,
                type:400
            }
        })

        return count
    }

    static async getBookFavor(uid,bookID){
        const favorNums = await Favor.count({
            where:{
                art_id:bookID,
                type:400
            }
        })

        const myFavor = await Favor.findOne({
            where:{
                art_id:bookID,
                uid,
                type:400
            }
        })

        return {
            fav_nums:favorNums,
            like_status:myFavor?1:0
        }
    }
}

 

Book.init({
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true
    },
    fav_nums:{
        type:Sequelize.INTEGER,
        default:0
    }
},{
    sequelize:sequelize,
    tableName:'book'
})

module.exports = {
    Book
}