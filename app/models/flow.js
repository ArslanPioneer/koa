const {sequelize} =require('../../core/db')

const {Sequelize,Model} =require('sequelize')

class Flow extends Model {

}

Flow.init({
    index:Sequelize.INTEGER,
    art_id:Sequelize.INTEGER,
    type:Sequelize.INTEGER
    //type 100 movie
    //type 200 music
    //type 300 sentence
},{
    sequelize:sequelize,
    tableName:'flow'
})

module.exports={
    Flow
}