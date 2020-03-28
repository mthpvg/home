const EventEmitter = require('events')


module.exports = class Socket extends EventEmitter{

  constructor(SERVER_IP, SERVER_PORT) {
    super()
    console.log(`ws://${SERVER_IP}:${SERVER_PORT}`)
    this.webSocket = new WebSocket(`ws://${SERVER_IP}:8081`)
    this.onError()
    this.onClose()
    this.onOpen()
    this.onMessage()
  }

  onError() {
    this.webSocket.onerror = (error) => {
      console.error('webSocket error', error)
    }
  }

  onClose() {
    this.webSocket.onclose = (event) => {
      console.log('closing')
      this.emit('close')
    }
  }

  onOpen() {
    this.webSocket.onopen = () => {
      console.log(`opening`)
    }
  }

  onMessage() {
    this.webSocket.onmessage = (message) => {
      try {
        const data = JSON.parse(message.data)
        this.emit('data', data)
      } catch (error) {
        console.error('cannot parse JSON', error)
      }
    }
  }

  close() {
    this.webSocket.close()
  }

}
