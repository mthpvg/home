const express = require('express')
const Sensors = require('./sensors')
const app = express()
const sensors = new Sensors()

const month = {
  temperatures: [],
  humidity: [],
  gasResistance: [],
  dates: []
}
const week = {
  temperatures: [],
  humidity: [],
  gasResistance: [],
  dates: []
}
const day = {
  temperatures: [],
  humidity: [],
  gasResistance: [],
  dates: []
}


sensors.init().then(() => {
  setInterval(() => {
    sensors.read().then((measures) => {
      if (day.temperatures.length >= 24 * 60) {
        day.temperatures.shift()
        day.dates.shift()
        day.humidity.shift()
        day.gasResistance.shift()
      }
      day.temperatures.push(measures.temperature)
      day.humidity.push(measures.humidity)
      day.gasResistance.push(measures.gasResistance)
      const date = new Date()
      day.dates.push(date.toISOString().split('.')[0])
    })
  },   60 * 1000)

  setInterval(() => {
    if (week.temperatures.length >= 4 * 24 * 7) {
      week.temperatures.shift()
      week.humidity.shift()
      week.gasResistance.shift()
      week.dates.shift()
    }
    if (day.temperatures.length < 15) return
    week.temperatures.push(average(day.temperatures, 15))
    week.humidity.push(average(day.humidity, 15))
    week.gasResistance.push(average(day.gasResistance, 15))
    const date = new Date()
    week.dates.push(date.toISOString().split('.')[0])
  },   15 * 60 * 1000)

  setInterval(() => {
    if (month.temperatures.length >= 24 * 28) {
      month.temperatures.shift()
      month.humidity.shift()
      month.gasResistance.shift()
      month.dates.shift()
    }
    if (day.temperatures.length < 60) return
    month.temperatures.push(average(day.temperatures, 60))
    month.humidity.push(average(day.humidity, 60))
    month.gasResistance.push(average(day.gasResistance, 60))
    const date = new Date()
    month.dates.push(date.toISOString().split('.')[0])
  },   60 * 60 * 1000)
})

function average(measures, number) {
  const lastMeasures = measures.slice(measures.length - number)
  let sum = 0
  lastMeasures.forEach((temp) => sum += temp)
  return sum / number
}

app.use(express.static('public'))

app.get('/sensors/day', (req, res) => {
  res.send(day)
})

app.get('/sensors/week', (req, res) => {
  res.send(week)
})

app.get('/sensors/month', (req, res) => {
  res.send(month)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
