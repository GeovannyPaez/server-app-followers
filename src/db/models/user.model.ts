import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize, DataTypes, InitOptions, ModelAttributes, Optional, NonAttribute } from "sequelize";
import { Followers } from "./followers.model";
import { Profile } from "./profile.model";
import { Seguidor } from "./seguidor.model";
// import { Customer } from "./custumer.model";
// import { Role, ROLE_TABLE } from "./role.model";
// import bcrypt from 'bcrypt'
// interface IUserModel {
//     id?: number;
//     email: string
//     password: string
//     role: string
//     createdAt?: Date
//     recoveryToken?: string
// }
const USER_TABLE = 'user'

const UserSchema: ModelAttributes<User, Optional<InferAttributes<User, { omit: never; }>, never>> = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW
    }
}


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{

    declare id: CreationOptional<number>
    declare email: string
    declare password: string
    declare profile: NonAttribute<Profile>
    declare createdAt: CreationOptional<Date>
    declare followersUsers: NonAttribute<Seguidor[]>
    declare followers: NonAttribute<Followers[]>

    static associate() {
        this.hasOne(Profile, {
            as: "profile",
            foreignKey: 'userId'
        });
        this.hasMany(Seguidor, { foreignKey: 'idFollowed',as:'followersUsers' })
        // console.log(this.belongsTo)
        this.hasMany(Followers, { foreignKey: 'userId', as:'followers' });
    };

    static config(sequelize: Sequelize): InitOptions {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'User',
            timestamps: false,
            // hooks:{
            //   beforeCreate: async (user:User,options)=>{
            //     const passwor = await bcrypt.hash(user.password,10);
            //     user.password = passwor;
            //   }
        }
    }
}


// User.init()
export { User, USER_TABLE, UserSchema }

