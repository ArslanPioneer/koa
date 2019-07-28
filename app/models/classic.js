const {sequelize} =require('../../core/db')

const {Sequelize,Model} =require('sequelize')

const classicFields = {
    image:Sequelize.STRING,
    title:Sequelize.STRING,
    content:Sequelize.STRING,
    pubdate:Sequelize.DATEONLY,
    fav_nums:Sequelize.INTEGER,
    type:Sequelize.INTEGER                     
}

class Movie extends Model {

}

Movie.init(classicFields,{
    sequelize:sequelize,
    tableName:'movie'
})

class Sentence extends Model {

}

Sentence.init(classicFields,{
    sequelize:sequelize,
    tableName:'sentence'
})

class Music extends Model {

}

const musicFields =Object.assign({url:Sequelize.STRING},classicFields)

Music.init(musicFields,{
    sequelize:sequelize,
    tableName:'music'
})


module.exports ={
    Movie,
    Sentence,
    Music
}