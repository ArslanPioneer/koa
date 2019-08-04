const  {
    Movie,
    Sentence,
    Music
} =require('../models/classic')
const {
    Op
} =require('sequelize')
const {
    flatten 
} =require('lodash')
const {
    Favor
} =require('../models/favor')
class Art {
    constructor(art_id,type){
        this.art_id =art_id
        this.type =type
    }

    async getDetail(uid){
        const art =await Art.getData(this.art_id,this.type)
        if(!art){
            throw new global.errs.NotFound()
        }

        const likeStatus =await Favor.userLikeIt(uid,this.type,this.art_id)

        return  {
            art,
            like_status:likeStatus,
        }
    }

    static async getList(artInfoList){
        const artInfoObj ={
            100:[],
            200:[],
            300:[]
        }
        const arts= []
        for(let artinfo of artInfoList){
            artInfoObj[artinfo.type].push(artinfo.art_id)
        }
        for(let key in artInfoObj){
            const ids =artInfoObj[key]
            if(ids.length === 0){
                continue
            }
            
            arts.push(await Art._getListByType(ids,key))
        }
    }

    static async _getListByType(ids,type){
        let arts = []
        const finder ={
            where:{
                id:{
                    [Op.in]:ids
                }
            }
        }
        switch(type) {
            case 100:
                arts =await Movie.findAll(finder)
                break;
            case 200:
                arts =await Music.findAll(finder)
                break;
            case 300:
                arts=await Sentence.findAll(finder)
                break;
            case 400:
                break;
            default:
                break;

        }

        return flattern(arts)
    }

    static async getData(art_id,type){
        let art =null
        const finder ={
            where:{
                id:art_id
            }
        }
        switch(type) {
            case 100:
                art =await Movie.findOne(finder)
                break;
            case 200:
                art =await Music.findOne(finder)
                break;
            case 300:
                art =await Sentence.findOne(finder)
                break;
            case 400:
                break;
            default:
                break;

        }
        return art
    }
}

module.exports={
    Art
}