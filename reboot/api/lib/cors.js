// https://vinaygopinath.me/blog/tech/enable-cors-with-pre-flight/

module.exports = function cors(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://192.168.1.17:3000')
  res.header('Access-Control-Allow-Headers', 'authorization')

  if ('OPTIONS' == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
}
