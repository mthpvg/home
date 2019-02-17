const express = require('express')
const Sensors = require('./sensors')
const app = express()
const sensors = new Sensors()

const week = {
  temperatures: [],
  dates: []
}

const day = {
  temperatures: [],
  dates: []
}

sensors.init().then(() => {
  setInterval(() => {
    sensors.read().then((measures) => {
      if (day.temperatures.length >= 24 * 60) {
        day.temperatures.shift()
        day.dates.shift()
      }
      day.temperatures.push(measures.temperature)
      const date = new Date()
      day.dates.push(date.toISOString().split('.')[0])
    })
  },   60 * 1000)

  setInterval(() => {
    if (week.temperatures.length >= 24 * 4 * 7) {
      week.temperatures.shift()
      week.dates.shift()
    }
    if (day.temperatures.length < 15) return
    const last15Measures = day.temperatures.slice(day.temperatures.length - 15)
    let sum = 0
    last15Measures.forEach((temp) => sum += temp)
    const average = sum / 15
    week.temperatures.push(average)
    const date = new Date()
    week.dates.push(date.toISOString().split('.')[0])
  },   15 * 60 * 1000)
})

app.use(express.static('public'))

app.get('/sensors/day', (req, res) => {
  res.send(day)
})

app.get('/sensors/week', (req, res) => {
  res.send(week)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
