const {sequelize} =require('../../core/db')
const {Sequelize,Model,Op} =require('sequelize')
const util =require('util')
const axios =require('axios')
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