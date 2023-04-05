d3.dsv(';','147_15-21_junio.csv', d3.autoType).then(data => {
  
    console.log(data)
  
    let chart = Plot.plot({
      marks: [
        Plot.barY(data, Plot.groupX({y: 'count'},
          {x: 'prestacion',
          fill: d => (d.prestacion == 'Vehículo mal estacionado' ? 'rgb(255, 128, 0)' :  '#cfcfcf')},
        )),
        
    ],

    })

    d3.select('#chart').append(() => chart)
  })
  
  