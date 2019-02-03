const BME280 = require('bme280-sensor')

const bme280 = new BME280({i2cBusNo: 1, i2cAddress : 0x77})


bme280.init()
  .then(() => {
    console.log('BME280 initialization succeeded')
    setInterval(() => {
      bme280.readSensorData()
      .then((data) => {
        delete data.humidity
        console.log(JSON.stringify(data, null, 2))
      })
      .catch((err) => {
        console.log(`BME280 read error: ${err}`)
      })
    }, 2000)
  })
  .catch((err) => console.error(`BME280 initialization failed: ${err} `))
