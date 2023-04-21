'use strict';

const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const router = require('./router');

const PORT = 3001;

app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
