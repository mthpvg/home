fetch('/sensors')
  .then(
    function(response) {
      if (response.status !== 200) return console.error('cannot fetch /sensors')

      response.json().then(function(data) {
        console.log(data)
        const chart = c3.generate({
          size: {
            height: 720,
          },
          bindto: '#chart',
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
  console.log({days})



  const regions = []
  days.forEach((day) => {
    switch(new Date(day).getDay()) {
      case (1):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T05:45:00`, end: `${day}T08:00:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T17:30:00`, end: `${day}T21:00:00`, class: 'heating'
        })
        break
      case (2):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T05:45:00`, end: `${day}T08:00:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T17:30:00`, end: `${day}T21:00:00`, class: 'heating'
        })
        break
      case (4):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T05:45:00`, end: `${day}T08:00:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T17:30:00`, end: `${day}T21:00:00`, class: 'heating'
        })
        break
      case (5):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T05:45:00`, end: `${day}T08:00:00`, class: 'heating'
        })
        regions.push({
          start: `${day}T17:30:00`, end: `${day}T21:00:00`, class: 'heating'
        })
        break
      case (3):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T06:45:00`, end: `${day}T21:00:00`, class: 'heating'
        })
        break
      case (6):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T06:45:00`, end: `${day}T21:00:00`, class: 'heating'
        })
        break
      case (7):
        regions.push({
          start: `${day}T00:00:00`, end: `${day}T01:00:00`, class: 'new'
        })
        regions.push({
          start: `${day}T06:45:00`, end: `${day}T21:00:00`, class: 'heating'
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
