module.exports = function (req, res, next) {
  console.log(Object.keys(res))
  next(4)
}