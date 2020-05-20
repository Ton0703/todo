const Koa = require('koa')
const koaBody = require('koa-body')
const error = require('koa-json-error')
const router = require('./routes')
const cors = require('koa2-cors')
const logger = require('koa-logger')
const {open} = require('./db')
const app = new Koa()

open()
app.use(cors())
app.use(logger())
app.use(koaBody())
app.use(error({
    postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  }));
  app.use(router.routes()).use(router.allowedMethods())

app.listen(3030, () => console.log('后端启动成功'))