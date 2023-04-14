const mapaFetch = d3.json('barrios-caba.geojson')
const dataFetch = d3.dsv(';', '/data/147_vehiculos_mal_estacionados.csv', d3.autoType)


Promise.all([mapaFetch, dataFetch]).then(([barrios, data]) => {
  
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
      // Quantize continuo (cant. denuncias) -> discreto (cant. colores)
      type: 'quantize', 
      n: 5,
      scheme: 'bupu',
      label: 'Cantidad de denuncias por autos mal estacionados',
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
          filter: (d) => d.properties.DENUNCIAS > 600,
          fill: 'white',
          fontSize: d => (d.properties.BARRIO == "PALERMO" ? '16px' :  '11px'),
          fontWeight: d => (d.properties.BARRIO == 'PALERMO' ? 'bold': 'normal'),
        })
      )
    ],
  })

  d3.select('#chart').append(() => chartMap)
})
