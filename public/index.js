get('week', 'temperatures')
get('week', 'humidity')
get('week', 'gasResistance')

get('month', 'temperatures')
get('month', 'humidity')
get('month', 'gasResistance')

get('day', 'gasResistance')

function get(period, measure) {
  fetch(`/sensors/${period}`)
  .then(function(response) {
    if (response.status !== 200) return console.error('cant fetch /sensors/*')
    response.json().then(function(multiData) {
      // const data = multiData[0]
      const chart = c3.generate({
        size: {height: 270},
        bindto: `#chart-${period}-${measure}`,
        data: format(multiData, measure),
        axis: getAxis(period, measure),
        regions: getRegions(multiData[0]),
        point: {show: true}
      })
    })
  })
  .catch(errorHandler)
}

function format(multiData, measure) {
  return {
    x: 'time',
    xFormat: '%Y-%m-%dT%H:%M:%S',
    columns: [
      ['time'].concat(multiData[0].dates),
      [`${measure}0`].concat(multiData[0][measure]),
      [`${measure}1`].concat(multiData[1][measure]),
    ]
  }
}

function getAxis(period, measure) {
  let format
  if (period === 'day') format = '%H:%M'
  if (period === 'week') format = '%d %H:%M'
  if (period === 'month') format = '%m/%d'

  return {
    x: {
      label: {text: 'Time', position: 'outer-center'},
      type: 'timeseries',
      tick: {format}
    },
    y: {
      label: {text: `${measure}0`, position: 'outer-middle'},
    },
    y2: {
      label: {text: `${measure}1`, position: 'outer-middle'},
    }
  }
}

function getRegions(data) {
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
        regions.push(newDayRegion(day))
        regions.push(newMorningRegion(day))
        regions.push(newEveningRegion(day))
        break
      case (2):
        regions.push(newDayRegion(day))
        regions.push(newMorningRegion(day))
        regions.push(newEveningRegion(day))
        break
      case (4):
        regions.push(newDayRegion(day))
        regions.push(newMorningRegion(day))
        regions.push(newEveningRegion(day))
        break
      case (5):
        regions.push(newDayRegion(day))
        regions.push(newMorningRegion(day))
        regions.push(newEveningRegion(day))
        break
      case (3):
        regions.push(newDayRegion(day))
        regions.push(newFullDayRegion(day))
        break
      case (6):
        regions.push(newDayRegion(day))
        regions.push(newFullDayRegion(day))
        break
      case (7):
        regions.push(newDayRegion(day))
        regions.push(newFullDayRegion(day))
        break
    }
  })
  return regions
}

function newDayRegion(day) {
  return {start: `${day}T00:00:00`, end: `${day}T00:30:00`, class: 'new'}
}

function newMorningRegion(day) {
  return {start: `${day}T04:30:00`, end: `${day}T07:30:00`, class: 'heating'}
}

function newEveningRegion(day) {
  return {start: `${day}T15:30:00`, end: `${day}T19:30:00`, class: 'heating'}
}

function newFullDayRegion(day) {
  return {start: `${day}T04:30:00`, end: `${day}T19:30:00`, class: 'heating'}
}

function errorHandler(error) {
  console.error('fetching /sensors/* failed: ', error)
}
