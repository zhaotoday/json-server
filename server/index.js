const config = require('./utils/config')
const routes = require('./utils/routes')
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)

server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  next()
})

server.use(jsonServer.rewriter(routes))

server.use(router)

server.listen(config.port, () => {
  console.log('JSON Server is running')
})

router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}