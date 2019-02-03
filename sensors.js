const BME280 = require('bme280-sensor')


module.exports = class Sensors {

  constructor() {
    this.bme280 = new BME280({i2cBusNo: 1, i2cAddress : 0x77})
  }

  init() {
    return this.bme280.init()
      .then(() => {console.log('BME280 initialization succeeded')})
      .catch((err) => console.error(`BME280 initialization failed: ${err} `))
  }

  read() {
    return this.bme280.readSensorData()
      .then((measures) => {
        return {
          temperature: Number(measures.temperature_C.toPrecision(4))
          // pressure: Number(measures.pressure_hPa.toPrecision(5))
        }
      })
      .catch((err) => {
        console.log(`BME280 read error: ${err}`)
      })
  }

}
