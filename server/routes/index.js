const Router = require('koa-router')
const router = new Router()
const { home, create, delete: del, update } = require('../controller')

router.get('/todo/:type', home)
router.post('/todo', create)
router.delete('/todo/:id', del)
router.patch('/todo/:id', update)

module.exports = router