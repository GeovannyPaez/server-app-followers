// eslint-disable-next-line no-console
import express from 'express';
import cors from 'cors';
import { routerApp } from './routes';
import { logErrors,boomErrorHandler,errorHandler,ormErrorHandler } from './middlewaresd/errors.handler';
const port = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.json({ ' message': ' welcome to this API' });
});

//auth
require('./auth/index');
routerApp(app);

//middlewares 
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('server in port' + port);
});
