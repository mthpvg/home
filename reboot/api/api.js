const express = require('express')
const app = express()
const PORT = 8080

app.get('/', (req, res) => {
  res.send('api')
})

app.listen(PORT, () => console.log(`api is listening on port ${PORT}`))
