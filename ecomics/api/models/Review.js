const S = require('sequelize')
const db = require('../db')

class Review extends S.Model{}

Review.init({
    rating:{
        type:S.INTEGER,
        allowNull:false
    },
    comentario:{
        type:S.TEXT
    }    
},
{
    sequelize: db,
    modelName: "review"
})

module.exports = Review