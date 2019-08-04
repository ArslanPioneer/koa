
const {sequelize} =require('../../core/db')

const {Sequelize,Model,Op} =require('sequelize')
const {Favor} =require('./favor')
class HotBook extends Model {
    static async getAll(){
        const hotBooks = await HotBook.findAll({
            order:[
                'index'
            ]
        })

        const ids =[]
        hotBooks.forEach(item =>{
            ids.push(item.id)
        }) 

        const favors =await Favor.findAll({
            where:{
                art_id:{
                    [Op.in]:ids,
                }
            },
            group:['art_id'],
            attributes:['art_id',[Sequelize.fn('COUNT','*'),'count']]
        })

        hotBooks.forEach(book =>{
            HotBook._getEachBookStatus(book,favors)
        })

        return hotBooks
    }

    static _getEachBookStatus(book,favors){
        let count =0
        favors.forEach(favor =>{
            if(book.id === favor.art_id){
                count  =favor.get('count')
            }
        })
        book.setDataValue('count',count)
        return book
    }
}

HotBook.init({
    index:Sequelize.INTEGER,
    image:Sequelize.STRING,
    author:Sequelize.STRING,
    title:Sequelize.STRING
},{
    sequelize:sequelize,
    tableName:'hot_book'
})

module.exports ={
    HotBook
}
//排序 重要