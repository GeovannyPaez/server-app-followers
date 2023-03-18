// import { User } from "../db/models/user.model";
import { Followers } from "../db/models/followers.model";
import { Profile } from "../db/models/profile.model";
import { Seguidor } from "../db/models/seguidor.model";
import { User } from "../db/models/user.model";
import { models } from "../db/sequelize";

export type IRegisterFollower = {
    "email": string,
    "gender": string,
    "name": string,
    "phone": number
}
export class UserService {
    async allUsers() {
        return await models.User.findAll({attributes:{exclude:['password']},include:[{model:Profile,as:'profile',attributes:{exclude:['followerId']}}],});
    }

    async createFollower(user_id: number, profile: IRegisterFollower) {

        const res = await models.Followers.create({
            'email': profile.email,
            'userId': user_id,
        })
        const resNewProfile = await models.Profile.create({
            'followerId': res.id,
            'gender': profile.gender,
            'name': profile.name,
            'phone': profile.phone
        });
        return { resNewProfile, res }
        // console.log(resNewProfile,res)
    }
    async getFollowersById(userId: number) {
        const user = await models.User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Followers,
                    as: 'followers',
                    include: ['profile']
                },
                {
                    model: Seguidor,
                    as: 'followersUsers',
                    include: [{
                        model: User,
                        as: 'user',
                        include: [
                            {
                                model: Profile,
                                as: 'profile',
                                attributes: {
                                    exclude: ['followerId']
                                }
                            }
                        ]
                    }]
                }
            ]
        }
        );
        let countFollowers;
        if(user?.followers || user?.followersUsers){
            countFollowers= user?.followers.length + user?.followersUsers.length
        }
        return { user,countFollowers }
    }

    async followUser(idFollower: number, idFollowed: number) {
        // console.log(idFollowed, idFollowed)
        const res = await models.Seguidor.create({
            idFollowed,
            idFollower
        });
        return res;
    }
    async searchUser(nameOrEmail:string){
        const users = await this.allUsers();
        const usersFiltrados = users.filter(user=> user.email.includes(nameOrEmail) || user.profile.name.includes(nameOrEmail));
        return usersFiltrados;
    }
    async getByEmail(email:string){
        return await models.User.findOne({where:{email}});
    }
}