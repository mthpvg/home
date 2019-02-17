fetch('/sensors/day')
  .then(
    function(response) {
      if (response.status !== 200) return console.error('cannot fetch /sensors')

      response.json().then(function(data) {
        console.log(data)
        const chart = c3.generate({
          size: {
            height: 360,
          },
          bindto: '#chart-day',
          data: format(data),
          axis,
          regions: getFrom(data),
          point: {
            show: false
          }
        })
      })
    }
  )
  .catch(function(error) {
    console.error('fetching /sensors failed: ', error)
  })

  fetch('/sensors/week')
    .then(
      function(response) {
        if (response.status !== 200) return console.error('cannot fetch /sensors')

        response.json().then(function(data) {
          console.log(data)
          const chart = c3.generate({
            size: {
              height: 360,
            },
            bindto: '#chart-week',
            data: format(data),
            axis,
            regions: getFrom(data),
            point: {
              show: false
            }
          })
        })
      }
    )
    .catch(function(error) {
      console.error('fetching /sensors failed: ', error)
    })

function format(data) {
  return {
    x: 'time',
    xFormat: '%Y-%m-%dT%H:%M:%S',
    columns: [
      ['time'].concat(data.dates),
      ['temperature'].concat(data.temperatures)
    ]
  }
}

function getFrom(data) {
  const days = []
  data.dates.forEach((date) => {
    const day = date.split('T')[0]
    if (days.length === 0) return days.push(day)
    if (day === days[days.length - 1]) return
    days.push(day)
  })



  const regions = []
  days.forEach((day) => {
    switch(new Date(day).getDay()) {
      case (1):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T04:30:00`, end: `${day}T07:30:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T15:30:00`, end: `${day}T19:30:00`, class: 'heating'
        })
        break
      case (2):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T04:30:00`, end: `${day}T07:30:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T15:30:00`, end: `${day}T19:30:00`, class: 'heating'
        })
        break
      case (4):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T04:30:00`, end: `${day}T07:30:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T15:30:00`, end: `${day}T19:30:00`, class: 'heating'
        })
        break
      case (5):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T04:30:00`, end: `${day}T07:30:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T15:30:00`, end: `${day}T19:30:00`, class: 'heating'
        })
        break
      case (3):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T04:30:00`, end: `${day}T19:30:00`, class: 'heating'
        })
        break
      case (6):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T04:30:00`, end: `${day}T19:30:00`, class: 'heating'
        })
        break
      case (7):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T04:30:00`, end: `${day}T19:30:00`, class: 'heating'
        })
        break
    }
  })
  console.log({regions})
  return regions
}

const axis = {
  x: {
    label: {
      text: 'Time',
      position: 'outer-center'
    },
    type: 'timeseries',
    tick: {
      format: '%H'
    }
  },
  y: {
    label: {
      text: 'Temperature',
      position: 'outer-middle',
    },
    // max: 35,
    // min: 20
  }
}
