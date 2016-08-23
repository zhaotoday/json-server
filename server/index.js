const config = require('./utils/config')
const routes = require('./utils/routes')

const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.urlencoded({ extended: false }));

server.get('/blog/*', (req, res) => {
  console.log(222)
  res.jsonp(req.query)
})

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createAt = Date.now()
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