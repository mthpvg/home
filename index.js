const express = require('express')
const Sensors = require('./sensors')
const app = express()
const sensors = new Sensors()

const data = {
  temperature: []
}

sensors.init().then(() => {
  setInterval(() => {
    sensors.read().then((measures) => {
      // 10080 = 60 * 24 * 7
      if (data.temperature.length >= 10080) {
        data.temperature = []
      }
      data.temperature.push(measures.temperature)
    })
  }, 60 * 1000)
})

app.use(express.static('public'))

app.get('/sensors', (req, res) => res.send(data))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
