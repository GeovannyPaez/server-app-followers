import express from 'express';
import passport, { session } from 'passport';
import { IPayloadToken } from '../services/auth.service';
import { UserService } from '../services/user.service';

const service = new UserService();
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
        const search = req.query.search;
        if (search) {
            const usersFilters = await service.searchUser(search as string);
            res.json(usersFilters);
            return;
        }
        const users = await service.allUsers();
        // await service.createFollower(1);}
        res.json(users);
    } catch (error) {
        next(error)
    }
})
router.post('/register-follower',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {

        try {
            const payloadToken = req.user as IPayloadToken;
            const { id } = payloadToken;

            res.json(await service.createFollower(id, req.body));
        } catch (error) {
            next(error)
        }
    });
router.get('/one/:userId', async (req, res, next) => {
    try {
        const userId = Number(req.params.userId);
        res.json(await service.getFollowersById(userId));
    } catch (error) {
        next(error)
    }
});
router.get('/followers',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const payloadToken = req.user as IPayloadToken;
            const id = payloadToken.id;
            res.json(await service.getFollowersById(id));
        } catch (error) {
            next(error)
        }
    });
router.post('/follow/:userId',
    passport.authenticate('jwt', { session: false }),
    async (req, res, next) => {
        try {
            const payloadToken = req.user as IPayloadToken;
            const idFollower = payloadToken.id;
            const idFollowed = Number(req.params.userId);
            const responseService = await service.followUser(idFollower, idFollowed);
            res.json(responseService);

        } catch (error) {
            next(error);
        }
    });


export default router;