const mapaFetch = d3.json('data/barrios-caba.geojson')
const dataFetch = d3.dsv(';', 'data/147_15-21_junio.csv', d3.autoType)


Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
  data = data.filter(d => d.prestacion == 'VEHÍCULO MAL ESTACIONADO')
  const reclamosPorBarrio = d3.group(data, d => d.domicilio_barrio)
  console.log('reclamosPorBarrio', reclamosPorBarrio)

   barrios.features.forEach(d => {
     let nombreBarrio = d.properties.BARRIO
     let cantReclamos =  reclamosPorBarrio.get(nombreBarrio).length
     d.properties.DENUNCIAS = cantReclamos
 
     console.log(nombreBarrio + ': ' + cantReclamos)
   })
  

  let chartMap = Plot.plot({
    projection: {
      type: 'mercator',
      domain: barrios,
    },
    color: {
      type: 'quantize', 
      n: 5,
      scheme: 'bupu',
      legend: true,
    },
    marks: [
      Plot.geo(barrios, {
        fill: d => {
          let nombreBarrio = d.properties.BARRIO
          let cantReclamos = reclamosPorBarrio.get(nombreBarrio).length
          return cantReclamos
        },
        stroke: '#ccc',
        title: d => `${d.properties.BARRIO}\n${d.properties.DENUNCIAS} denuncias`,
      }),
      Plot.text(
        barrios.features,
        Plot.centroid({
          text: (d) => d.properties.BARRIO,
          textAnchor: "center",
          dx: 4,
          filter: (d) => d.properties.DENUNCIAS > 150,
          fill: 'white',
          fontSize: d => (d.properties.BARRIO == "PALERMO" ? '17px' :  '10px'),
          fontWeight: 'bold'
        })
      )
    ],

    width: 550,
    height: 550,
  })

  d3.select('#chart_2').append(() => chartMap)
})
