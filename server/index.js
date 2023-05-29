'use strict';

const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
const { authMiddleware } = require('./middlewares/auth');


const PORT = 3001;

app
  .use(cors())
  .use(bodyParser())
  .use(authMiddleware)
  .use(router.routes())
  .listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
