d3.dsv(';','147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  
    console.log(data)
 
    let chart = Plot.plot({
        y: {
          grid: true,
          label: "modo de reclamo"
        },
        marks: [
          Plot.ruleY([0]),
          Plot.line(data, {x: "fecha_ingreso", y: "modo de reclamo", z: "fecha_cierre_contacto-fecha_ingreso"})
        ]
      })

    d3.select('#chart').append(() => chart)
  })
  
  

