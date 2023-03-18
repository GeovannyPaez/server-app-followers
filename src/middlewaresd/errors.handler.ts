import { Request, Response, NextFunction} from "express";
import { ValidationError } from "sequelize";
import {isBoom} from '@hapi/boom'
import config from "../config";
export const logErrors=(error:Error,req:Request,res:Response,next:NextFunction)=>{
    //log erros if  app is in mode development
        if(config.isDev){
            console.error(error);
        }
        next(error);
}

export const errorHandler =(error:Error,req:Request,res:Response,next:NextFunction)=>{
    res.json({
        message:error.message,
        stack:error.stack
    }).status(500)
};

// response errors of boom
export const boomErrorHandler =(error:Error,req:Request,res:Response,next:NextFunction)=>{
    if(isBoom(error)){
        const {output} = error;
        res.status(output.statusCode).json(output.payload);
    }
    else{
        next(error)
    }
}

//  response error of ORM in this case Sequelize 
export const  ormErrorHandler =(error:Error,req:Request,res:Response,next:NextFunction)=>{
    if(error instanceof ValidationError){
        res.status(409).json({
            statusCode:409,
            message:error.message,
            errors:error.errors
        })
    }else{
        next(error)
    }
}




