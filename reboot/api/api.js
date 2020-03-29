const webserver = require('./webserver')()

const webSocketServer = require('./websocket-server')(webserver)

const station = require('./station')

setInterval(() => {
  const payload = station()
  webSocketServer.send(payload)
}, 1000)
