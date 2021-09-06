const S = require('sequelize')

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
        type: S.DATE,
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
    hash: {
        type: S.STRING,
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