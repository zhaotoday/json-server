module.exports = function (req, res, next) {
  console.log(res.locals.data)
  next()
}