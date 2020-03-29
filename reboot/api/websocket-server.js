const WebSocket = require('ws')
const PORT = 8081


module.exports = function getWebSocketServer(webserver) {
  const WSS = WebSocket.Server
  const wss = new WSS({server: webserver, port: PORT})

  console.log(`websocket server listening on port ${PORT}`)

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

  function send(payload) {
    if (wss.clients.length === 0) return

    wss.clients.forEach((client) => {
      if (client.readyState !== WebSocket.OPEN) return
      client.send(JSON.stringify(payload), (error) => {
        if (error) console.log('websocket send error', error)
      })
    })
  }

  return {send}

}
