const express = require('express')
const app = express()
const PORT = 8080
const cors = require('./lib/cors')

app.use(cors)

app.get('/', (req, res) => {
  res.send('api')
})

app.get('/data', (req, res) => {
  res.send({foo: 'bar'})
})

app.listen(PORT, () => console.log(`api is listening on port ${PORT}`))
