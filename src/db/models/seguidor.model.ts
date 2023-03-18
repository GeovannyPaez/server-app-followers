import { Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize,DataTypes, InitOptions, ModelAttributes,Optional, ForeignKey, NonAttribute} from "sequelize";
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
const SEGUIDOR_TABLE = 'seguidor'

const SeguidorSchema:ModelAttributes<Seguidor, Optional<InferAttributes<Seguidor, { omit: never; }>, never>>= {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    idFollowed:{
        allowNull:false,
        field:'id_followed',
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    },
    idFollower:{
        allowNull:false,
        field:'id_follower',
        type:DataTypes.INTEGER,
        references:{
            model:'user',
            key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE'
    }

  }
  
  
class Seguidor extends Model<InferAttributes<Seguidor>, InferCreationAttributes<Seguidor>>{

    declare id: CreationOptional<number>
    declare idFollower: ForeignKey<User['id']>
    declare idFollowed: ForeignKey<User['id']>
    declare user: NonAttribute<User>
    static associate (){
        //
        this.belongsTo(User,{as:'user',foreignKey:'idFollower'})
    };
  
    static config(sequelize: Sequelize):InitOptions {
        return {
            sequelize,
            tableName: SEGUIDOR_TABLE,
            modelName: 'Seguidor',
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
export { Seguidor, SEGUIDOR_TABLE,SeguidorSchema}

