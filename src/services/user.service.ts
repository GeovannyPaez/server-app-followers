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
        return await models.User.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: Profile, as: 'profile',
                    attributes: { exclude: ['followerId'] }
                },
                {
                    model: Seguidor,
                    as: 'followersUsers',
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['password'] },
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
            ],
        });
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
        const newFollower = {
            "id": res.id,
            'gender': resNewProfile.gender,
            'name': resNewProfile.name,
            'phone': resNewProfile.phone,
            'email': res.email
        }
        return { newFollower, message: 'follower registered' };
        // console.log(resNewProfile,res)
    }
    async getFollowersById(userId: number) {
        const user = await models.User.findByPk(userId, {
            attributes: { exclude: ['password'] },
            include: [
                'profile',
                {
                    model: Followers,
                    as: 'followers',
                    include: [
                        {
                            model: Profile,
                            as: 'profile',
                            attributes: { exclude: ['userId'] }
                        }
                    ],

                },
                {
                    model: Seguidor,
                    as: 'followersUsers',
                    // attributes:{exclude:['fo']},
                    include: [{
                        model: User,
                        as: 'user',
                        attributes: { exclude: ['password'] },
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
        if (user?.followers || user?.followersUsers) {
            countFollowers = user?.followers.length + user?.followersUsers.length
        }
        return { user, countFollowers }
    }

    async followUser(idFollower: number, idFollowed: number) {
        // console.log(idFollowed, idFollowed);
        const userIsFollow = await models.Seguidor.findOne({
            where: {
                idFollowed,
                idFollower
            }
        })

        if (!userIsFollow) {
            const res = await models.Seguidor.create({
                idFollowed,
                idFollower
            });
            return {isFollowing:true,...res.dataValues};
        }
        await userIsFollow.destroy();
        return { message: 'unfollow to user with id: ' + idFollowed,isFollowing:false };
    }
    async searchUser(nameOrEmail: string, userId: undefined | number = undefined) {
        const users = await this.allUsers();
        const usersFiltrados = users.filter(user =>{
            const userNameLowerCase = user.profile.name.toLowerCase();
            if(user.email.includes(nameOrEmail.toLowerCase()) || userNameLowerCase.includes(nameOrEmail.toLowerCase())){
                return user
            } ;
        });
        const following = await models.Seguidor.findAll({
            where: {
                idFollower: userId
            }
        });

        // console.log('following',following);
        if (!userId) {
            return usersFiltrados;
        }

        if(following.length > 0){
            const userWithIsFollow = usersFiltrados.map(user => {
                let newUserInfo: unknown;
                following.forEach(element => {
                    if (user.followersUsers.length > 0) {
    
                        user.followersUsers.forEach(follower => {
                            if (follower.idFollower === element.idFollower) {
                                newUserInfo = { ...user.dataValues, isFollowing: true }
                            } else {
                                newUserInfo = { ...user.dataValues, isFollowing: false };
                            }
                        })
                    } else {
                        newUserInfo = { ...user.dataValues, isFollowing: false }
                    }
                });
                return newUserInfo;
            })
            // console.log(userWithIsFollow);
            return userWithIsFollow;
        }
        else {
            return usersFiltrados.map(user=>{
                return {...user.dataValues,isFollowing:false}
            })
        }

    }
    async getByEmail(email: string) {
        return await models.User.findOne({ where: { email } });
    }
}