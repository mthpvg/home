const Sensors = require('./sensors.js')

const sensors = new Sensors()

sensors.init().then(async () => {
	const result = await sensors.read()
	console.log(result)
})


