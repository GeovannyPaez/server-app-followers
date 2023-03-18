import { Strategy, ExtractJwt, StrategyOptions, VerifiedCallback } from 'passport-jwt';
import config from '../../config'
import { IPayloadToken } from '../../services/auth.service';
// import { IPayloadToken } from '../../../routes/auth.route';
const { jwtSecret } = config;

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret
}
const verifyCallback = (payload: IPayloadToken, done: VerifiedCallback) => {
    return done(null, payload);
}
const JwtStrtegy = new Strategy(options, verifyCallback)


export default JwtStrtegy;