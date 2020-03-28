module.exports = function (app) {
  const WebSocket = require('ws')
  const WSS = WebSocket.Server
  const wss = new WSS({server: app, port: 8081})

  wss.on('connection', onConnection)
  wss.on('error', onError)
  wss.on('close', onClose)

  function onConnection(webSocket) {
    console.log('websocket server connection')

    webSocket.on('close', () => {
      console.log('webSocket is closing')
    })
  }

  function onError(error) {
    console.log('webSocketServer errored', error)
  }

  function onClose() {
    console.log('webSocketServer is closing')
  }

  function send() {
    if (wss.clients.length === 0) return
    wss.clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) return
      const payload = {
        temperature: 20,
        humidity: 40,
        pressure: 1000,
        airQuality: 30
      }
      client.send(JSON.stringify(payload), (error) => {
        if (error) console.log('websocket send error', error)
      })
    })
  }

  return {send}

}
