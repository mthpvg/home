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
            columns: [
              ['temperature'].concat(data.temperature)
            ]
          }
        })
      })
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err)
  })
