const express = require('express')
const Sensors = require('./sensors')
const app = express()
const sensors = new Sensors()

const data = {
  temperatures: [],
  dates: []
}

sensors.init().then(() => {
  setInterval(() => {
    sensors.read().then((measures) => {
      if (data.temperatures.length >= 24 * 4 * 7) {
        data.temperatures.shift()
        data.dates.shift()
      }
      data.temperatures.push(measures.temperature)
      const date = new Date()
      data.dates.push(date.toISOString().split('.')[0])
    })
  },   15 * 60 * 1000)
})

app.use(express.static('public'))

app.get('/sensors', (req, res) => {
  // const data2 = require('./data.json')
  res.send(data)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
