const SERVER = 'http://192.168.1.17:8080'

fetch(`${SERVER}/data`)
  .then((response) => response.json())
  .then((json) => {
    console.log(json.foo)
  })
