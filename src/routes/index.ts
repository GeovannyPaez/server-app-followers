import express,{Express} from 'express';
import routerUser from './user.route';
import routerAuth from './auth.rotue';
export const routerApp = ( app: Express )=> {
    const router = express.Router();
    app.use('/app', router);
    router.use('/user',routerUser);
    router.use('/auth',routerAuth);
}