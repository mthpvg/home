const express = require('express')
const PORT = 8080
const cors = require('./lib/cors')


module.exports = function getWebserver() {
  const app = express()

  app.use(cors)

  app.get('/', (req, res) => {
    res.send('api')
  })
  
  app.get('/data', (req, res) => {
    res.send({foo: 'bar'})
  })
  
  app.listen(PORT, () => console.log(`webserver listening on port ${PORT}`))

  return app
}
