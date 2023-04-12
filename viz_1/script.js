d3.dsv(';','147_15-21_junio.csv', d3.autoType).then(data => {
  
    console.log(data)
  
    let chart = Plot.plot({
      marks: [
        Plot.barY(data, Plot.groupX({y: 'count'},
          {x: 'prestacion',
          fill: d => (d.prestacion == 'VEHÍCULO MAL ESTACIONADO' ? 'rgb(255, 128, 0)' :  '#cfcfcf'),
          sort: { x: 'x', limit: 10}
          }),
        ),
        
    ],

    })

    d3.select('#chart').append(() => chart)
  })
  
  