import express from 'express';
import { UserService } from '../services/user.service';

const service = new UserService();
const router = express.Router();


router.get('/',async(req,res)=>{
  try {
    const search = req.query.search;
    if(search){
        const usersFilters = await service.searchUser(search as string);
        res.json(usersFilters);
        return;
    }
    const users = await service.allUsers();
    // await service.createFollower(1);}
    res.json(users); 

  } catch (error) {
    console.error(error)
  }
})
router.post('/register-follower',async(req,res)=>{
try {
    res.json(await service.createFollower(1,req.body));
} catch (error) {
    console.error(res);
    res.send('ocurrio un error')
}
});

router.get('/followers',async(req,res)=>{
    try {
        res.json(await service.getFollowersById(1));
    } catch (error) {
        console.error(error);
    }
});
router.post('/follow/:userId',
async(req,res)=>{
    try {
        const idFollowed= Number(req.params.userId);
        const responseService  = await service.followUser(3,idFollowed);
        res.json(responseService);
    
    } catch (error) {
    console.error(error);
    }
});


export default router;