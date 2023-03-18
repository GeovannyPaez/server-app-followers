import Joi from 'joi';

const email= Joi.string().email();
 const password = Joi.string().min(6);
 const name= Joi.string();
 const phone= Joi.number().min(10);
 const gender = Joi.string().max(30);
const loginUserDto = Joi.object({
    email:email.required(),
    password:password.required()
});

const registerFollowerDto = Joi.object({
    name:name.required(),
    phone:phone.required(),
    gender:gender.required(),
    email:email.required()
}
)
const paramSearchDto = Joi.object({
    search:Joi.string().max(120),
})


export {loginUserDto, registerFollowerDto,paramSearchDto}