d3.dsv(';','147_15-21_junio.csv', d3.autoType).then(data => {

let dataFiltered = []

  data = d3.groups(data, d => d.prestacion)
    .filter(d => d[1].length >= 400)


  data = data.map(d => {
    return {
      prestacion: d[0],
      cant: d[1].length,
    }
  })


    console.log(data)

  console.log('data', data)
  
    let chart = Plot.plot({
      marks: [
        Plot.barY(data, 
          {
            x: 'prestacion',
            y: "cant"
//          fill: d => (d.prestacion == 'VEHÍCULO MAL ESTACIONADO' ? 'rgb(255, 128, 0)' :  '#cfcfcf'),

          //sort: { x: 'x', limit: 10}
          },
        ),
    ],
    })

    d3.select('#chart').append(() => chart)
  })
  
  