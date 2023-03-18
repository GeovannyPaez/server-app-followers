import { Sequelize } from "sequelize";
import { Followers, FollowerSchema } from "./followers.model";
import { Profile, ProfileSchema } from "./profile.model";
import { Seguidor, SeguidorSchema } from "./seguidor.model";
import { User, UserSchema } from "./user.model";
export const setupModels =(sequelize:Sequelize)=>{
    User.init(UserSchema,User.config(sequelize));
     Profile.init(ProfileSchema,Profile.config(sequelize));
     Seguidor.init(SeguidorSchema,Seguidor.config(sequelize));
    Followers.init(FollowerSchema,Followers.config(sequelize));


    User.associate();
    Seguidor.associate();
    Profile.associate();
    Followers.associate();

    //retunrs models

    // User.create({'email':'user@mail.com','password':'admin123'}).then((res)=>console.log(res));
    return {User,Seguidor,Profile,Followers};

}