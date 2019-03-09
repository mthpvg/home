const {Bme680} = require('bme680-sensor')


module.exports = class Sensor {

  constructor(address) {
    this.bme680 = new Bme680(1, address)
  }

  init() {
    return this.bme680.initialize()
      .then(() => {console.log('BME680 initialization succeeded')})
      .catch((err) => console.error(`BME680 initialization failed: ${err} `))
  }

  read() {
    return this.bme680.getSensorData()
      .then((measures) => {
        return {
          temperature: Number(measures.data.temperature.toPrecision(4)),
          humidity: Number(measures.data.humidity.toPrecision(4)),
          gasResistance: Number(measures.data.gas_resistance.toPrecision(6))
          // pressure: Number(measures.pressure_hPa.toPrecision(5))
        }
      })
      .catch((err) => {
        console.log(`BME680 read error: ${err}`)
      })
  }

}
