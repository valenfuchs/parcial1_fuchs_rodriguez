d3.dsv(';','/data/147_15-21_junio.csv', d3.autoType).then(data => {


  data = d3.groups(data, d => d.prestacion)
    .filter(d => d[1].length >= 300)


  data = data.map(d => {
    return {
      prestacion: d[0],
      cant: d[1].length,
    }
  })
  
    let chart = Plot.plot({
      marks: [
        Plot.barX(data, 
          { x: 'cant',
            y: "prestacion",
            fill: d => (d.prestacion == 'VEHÍCULO MAL ESTACIONADO' ? '#701C7F' :  '#B9B7B9'),
            opacity: d => (d.prestacion == 'VEHÍCULO MAL ESTACIONADO' ? 1 :  0.6),
            sort: {y: "x", reverse: true}
          },
        ), 
    ],

    x: {
      tickFormat: 'd',
      label: 'Cantidad de Reclamos',
      labelOffset: 50,
      grid: true
    },

    y: {
      label: null,
      tickFormat: d => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase(),
    },
   
    style:{
      fontFamily: 'Tahoma',
      fontSize: 14,
      color:'black', 
      padding: '10px',
    },

    width: 900,
    height: 500,
    marginLeft: 380,
    marginBottom: 100


    })

    d3.select('#chart').append(() => chart)
  })
  
  