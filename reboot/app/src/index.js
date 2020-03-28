const SERVER_IP = '192.168.1.17'
const SERVER_PORT = '8080'
const SERVER_URL = `http://${SERVER_IP}:${SERVER_PORT}`

const Socket = require('./socket')
const socket = new Socket(SERVER_IP, SERVER_PORT)

socket.on('data', console.log)

fetch(`${SERVER_URL}/data`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.foo)
  })
