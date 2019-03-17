const MAX1 = 78102
const MIN1 = 3739

const MAX0 = 226715
const MIN0 = 20032



get('week', 'temperatures')
get('week', 'humidity')
get('week', 'gasResistance')
get('week', 'gasResistance', 0)
get('week', 'gasResistance', 1)

get('month', 'temperatures')
get('month', 'humidity')
get('month', 'gasResistance')

get('day', 'gasResistance')

function get(period, measure, index) {
  fetch(`/sensors/${period}`)
  .then(function(response) {
    if (response.status !== 200) return console.error('cant fetch /sensors/*')
    response.json().then(function(multiData) {
      // const data = multiData[0]
      let bindto = `#chart-${period}-${measure}`
      if (typeof index !== 'undefined') bindto = `#chart-${period}-${measure}-${index}`
      const chart = c3.generate({
        size: {height: 540},
        bindto,
        data: format(multiData, measure, period, index),
        axis: getAxis(period, measure),
        regions: getRegions(multiData[0]),
        point: {show: false},
        // zoom: {enabled: true}
      })
    })
  })
  .catch(errorHandler)
}

function format(multiData, measure, period, index) {

  if (measure === 'gasResistance' && typeof index === 'undefined') {
    const max0 = Math.max(...multiData[0][measure])
    const min0 = Math.min(...multiData[0][measure])
    const max1 = Math.max(...multiData[1][measure])
    const min1 = Math.min(...multiData[1][measure])

    console.log({period, max0, min0, max1, min1})
  }

  let columns = [['time'].concat(multiData[0].dates)]

  if (typeof index !== 'undefined') {
    columns.push([`${measure}${index}`].concat(multiData[index][measure]))
  } else {
    if (measure === 'gasResistance') {
      const data0 = multiData[0][measure].map((m) => {
        return (m - MIN0) / (MAX0 - MIN0) * 100
      })
      const data1 = multiData[1][measure].map((m) => {
        return (m - MIN1) / (MAX1 - MIN1) * 100
      })
      columns.push([`${measure}0`].concat(data0))
      columns.push([`${measure}1`].concat(data1))
    } else {
      columns.push([`${measure}0`].concat(multiData[0][measure]))
      columns.push([`${measure}1`].concat(multiData[1][measure]))
    }
    
  }

  return {
    x: 'time',
    xFormat: '%Y-%m-%dT%H:%M:%S',
    columns
  }
}

function getAxis(period, measure) {
  let format
  if (period === 'day') format = '%H:%M'
  if (period === 'week') format = '%d %H:%M'
  if (period === 'month') format = '%m/%d'

  let data =  {
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

  if (measure === 'humidity') {
    data.y.min = 0
    data.y.max = 100
  }

  return data
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
