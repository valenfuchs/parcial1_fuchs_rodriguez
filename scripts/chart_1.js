d3.dsv(';','../data/147_15-21_junio.csv', d3.autoType).then(data => {


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
            //quiero poner a 'vehiculo mal estacionado' en negrita o de ultima poner solo el 2015 en negrita pero no puedo :(
          },
        ), 

        Plot.text(data, {
          x: 'cant',
          y: 'prestacion',
          text: d => `${d.cant}`,
          textAnchor: 'start',
          fontWeight: 'bold', 
          fontSize: '16px',
          dx: 5,
        }),

        Plot.axisX({
          label:null,
          tickFormat: null,
          color: 'white'
        }),

        Plot.axisY({
          label: null,
          tickFormat: d => d.charAt(0).toUpperCase() + d.slice(1).toLowerCase(),
        }),
    ],
   
    style:{
      fontFamily: 'Helvetica',
      fontSize: 16,
      color:'black', 
      padding: '10px',
    },

    width: 900,
    height: 350,
    marginLeft: 380,
    marginRight: 100,
    marginBottom: 0,


    })

    d3.select('#chart_1').append(() => chart)
  })
  
  