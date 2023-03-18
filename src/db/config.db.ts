import config from "../config";

export default {
    developmen:{
        url:config.dbUrl,
        dialect:'mysql'
    },
    production:{
        url:config.dbUrl,
        dialect:'mysql',
        dialectOptions: {
            ssl:{
                rejectUnauthorized:false
            }
        }
    }
}