
import Boom from '@hapi/boom'
import {ObjectSchema} from 'joi'
import {NextFunction, Request, Response} from 'express'


export enum PropertyValidatorHandler{
    QUERY ='query',
    BODY= 'body',
    PARAMS='params',
}

// validate schemas made in Joi
export const validatorHandler =(eschema:ObjectSchema,property:PropertyValidatorHandler)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        const data = req[property];
        const {error} = eschema.validate(data,{abortEarly:false});
        if( error) {
            next(Boom.badRequest(error))
        }
        next();
    }
}