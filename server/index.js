const config = require('./utils/config')
const routes = require('./utils/routes')

const jsonServer = require('json-server')
const bodyParser = require('body-parser')

const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(bodyParser.urlencoded({extended: false}))

server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.created_at = Date.now()
  }
  next()
})

server.use(jsonServer.rewriter(routes))
server.use(router)

server.listen(config.port, () => {
  console.log('JSON Server is running')
})

router.render = (req, res) => {
  const data =res.locals.data
  const count = res._headers['x-total-count']

  if (data.constructor === Array) {
    res.jsonp({
      code: 0,
      message: '',
      data: {
        count: count,
        items: res.locals.data
      }
    })
  } else {
    res.jsonp({
      code: 0,
      message: '',
      data: res.locals.data
    })
  }
}