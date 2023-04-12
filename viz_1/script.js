d3.dsv(';','/data/147_15-21_junio.csv', d3.autoType).then(data => {

let dataFiltered = []

  data = d3.groups(data, d => d.prestacion)
    .filter(d => d[1].length >= 400)


  data = data.map(d => {
    return {
      prestacion: d[0],
      cant: d[1].length,
    }
  })
  
    let chart = Plot.plot({
      marks: [
        Plot.barY(data, 
          {
            x: 'prestacion',
            y: "cant",
            fill: d => (d.prestacion == 'VEHÍCULO MAL ESTACIONADO' ? '#810f7c' :  '#b3cde3'),
          },
        ),
    ],
    x: {
      labelOffset: 50,
      insetRight: 30,
      label: 'Cantidad de Reclamos',
    },
    y: {
      tickFormat: 'd',
      label: null,
    },
    style:{
      fontFamily: 'Tahoma',
      fontSize: 14,
      color:'black', 
      padding: '10px',
    },

    width: 700,
    height: 400,
    marginLeft: 80,

    })

    d3.select('#chart').append(() => chart)
  })
  
  