import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey, NonAttribute} from "sequelize";
import { Profile, PROFILE_TABLE } from "./profile.model";
import { User, USER_TABLE } from "./user.model";
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
const FOLLOWER_TABLE = 'followers'

const FollowerSchema:ModelAttributes<Followers, Optional<InferAttributes<Followers, { omit: never; }>, never>>= {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId:{
        field:'user_id',
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    email:{
        allowNull:false,
        unique:true,
        type:DataTypes.STRING,

    }
  }
  
  
class Followers extends Model<InferAttributes<Followers>, InferCreationAttributes<Followers>>{

    declare id: CreationOptional<number>
    declare userId: ForeignKey<User['id']>
    // declare profileId: ForeignKey<Profile['id']>
    declare email: string;
    declare profile: NonAttribute<Profile>
    declare user:NonAttribute<User>
    static associate (){
        //
        this.belongsTo(User,{as:'user'});
        this.hasOne(Profile,{foreignKey:'followerId', as:'profile'});
    };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: FOLLOWER_TABLE,
            modelName: 'Follower',
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
export { Followers, FOLLOWER_TABLE,FollowerSchema}

