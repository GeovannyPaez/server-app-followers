import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey} from "sequelize";
import { Followers, FOLLOWER_TABLE } from "./followers.model";
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
const PROFILE_TABLE = 'profile'

const ProfileSchema:ModelAttributes<Profile, Optional<InferAttributes<Profile, { omit: never; }>, never>>= {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
        allowNull:false,
        type:DataTypes.STRING,
    },
    gender:{
        allowNull:false,
        type:DataTypes.STRING
    },
    phone:{
        allowNull:false,
        type:DataTypes.BIGINT,
    },
    userId:{
        field:'user_id',
        // allowNull:false,
        type:DataTypes.INTEGER,
        unique:true,
        references:{
            model:USER_TABLE,
            key:'id'
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    followerId:{
        type:DataTypes.INTEGER,
        unique:true,
        field:'follower_id',
        references:{
            model:FOLLOWER_TABLE,
            key:'id'
        }
        ,
        onUpdate:'CASCADE'
    }
  }
  
  
class Profile extends Model<InferAttributes<Profile>, InferCreationAttributes<Profile>>{

    declare id: CreationOptional<number>
    declare name: string
    declare phone: number
    declare gender: string
    declare userId: ForeignKey<User['id']>
    declare followerId: ForeignKey<Followers['id']>
    static associate (){
        //
        this.belongsTo(User,{as:'user'});
        this.belongsTo(Followers,{as:'follower'});
    };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: PROFILE_TABLE,
            modelName: 'Profile',
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
export { Profile, PROFILE_TABLE,ProfileSchema}

