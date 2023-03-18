import { UserService } from "./user.service";
import bcrypt from 'bcrypt';
import boom from '@hapi/boom';
import jwt, { Secret } from 'jsonwebtoken';
import { User } from "../db/models/user.model";
import config from "../config";
const userService = new UserService();

export interface IPayloadToken {
    id: number
  }
export class AuthService {
    async getUser (emaii:string,pass:string){
        const user = await userService.getByEmail(emaii);
        if(!user) {
            throw boom.unauthorized();
        }
        const Match = await bcrypt.compare(pass,user.password);

        if(!Match){
            throw boom.unauthorized();
        }
        const {password, ...userLoged} = user.dataValues;
        return userLoged;
    }

    async generateJwt (user:User){
        const payload:IPayloadToken={
            id:user.id
        }
        const token = jwt.sign(payload,config.jwtSecret as Secret,{expiresIn:'24h'});
        return token;
    }
    
}