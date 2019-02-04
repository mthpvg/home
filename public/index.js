fetch('/sensors')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status)
        return
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data)
        const chart = c3.generate({
          bindto: '#chart',
          data: {
            x: 'time',
            xFormat: '%Y-%m-%dT%H:%M:%S',
            columns: [
              ['time'].concat(data.dates),
              ['temperature'].concat(data.temperatures)
            ]
          },
          axis
        })
      })
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err)
  })

const axis = {
  x: {
    label: {
      text: 'Time',
      position: 'outer-center'
    },
    type: 'timeseries',
    tick: {
      format: '%H:%M'
    }
  },
  y: {
    label: {
      text: 'Temperature',
      position: 'outer-middle'
    }
  }
}
