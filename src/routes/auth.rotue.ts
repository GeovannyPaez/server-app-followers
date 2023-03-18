import express from 'express';
import passport from 'passport';
import { User } from '../db/models/user.model';
import { loginUserDto } from '../dtos/user.dto';
import { PropertyValidatorHandler, validatorHandler } from '../middlewaresd/validator.handler';
import { AuthService } from '../services/auth.service';
const service = new AuthService();
const router = express.Router();


router.post('/login',
    validatorHandler(loginUserDto, PropertyValidatorHandler.BODY)
    , passport.authenticate('local', { session: false }),
    async (req, res, next) => {
        try {
            const user = req.user as User;
            const token = await service.generateJwt(user);
            res.json({ token });
        } catch (error) {
            next(error)
        }
    });


    export default router;