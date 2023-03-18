import {Strategy}from 'passport-local';
// import AuthService from '../../../services/auth.service';
import { AuthService } from '../../services/auth.service';
const service = new AuthService();

const LocalStrategy = new Strategy({
    usernameField:'email',
    passwordField:'password'
},async(email,password,done)=>{
  try {
    const user = await service.getUser(email,password);
    // console.log(user);
    done(null,user);
  } catch (error) {
    done(error,false);
  }
});
export default LocalStrategy;