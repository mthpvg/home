module.exports = function (id) {
  return {
    temperature: 20 + Math.round(Math.random() * 2),
    humidity: 40 + Math.round(Math.random() * 2),
    pressure: 1000 + Math.round(Math.random() * 50),
    airQuality: 30  + Math.round(Math.random() * 3)
  }
}
