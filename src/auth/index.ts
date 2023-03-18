import passport from "passport";
import JwtStrtegy from "./strategies/jwt.strategy";
import LocalStrategy from "./strategies/local.strategy";

passport.use(LocalStrategy);
passport.use(JwtStrtegy);
// export default passport;