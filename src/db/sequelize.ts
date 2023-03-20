
import { Sequelize, Options } from 'sequelize';
import config from '../config';
import { setupModels } from './models';
const options: Options = {
    dialect: 'mysql',
    logging: config.isDev ? console.log : false 
}
if (config.isprod) {
    options.dialectOptions = {
        ssl: { rejectUnauthorized: false }
    }
}

const sequelize = new Sequelize(config.dbUrl as string, options); 
const isConect =async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

const models = setupModels(sequelize);
isConect().then();

sequelize.sync({
    force:true
}).then()  
// // sequelize.sync().then();


export {models ,sequelize};