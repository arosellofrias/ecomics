const S = require('sequelize')
const db = require("../db")

class User extends S.Model{}

User.init({
    nombre: {
        type: S.STRING,
        allowNull: false
    },
    apellido: {
        type: S.STRING,
        allowNull: false
    },
    email:{
        type: S.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true,
        }
    },
    fechaDeNacimiento : {
        type: S.DATEONLY,
        allowNull: false
    },
    direccion: {
        type: S.STRING,
        allowNull: false
    },
    password:{
        type : S.STRING,
        allowNull: false
    },
    token: {
        type: S.TEXT,
    },
    privilegios: {
        type: S.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
{
    sequelize : db, modelName: 'user'
}
)

module.exports = User