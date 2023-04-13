d3.dsv(';','/data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {
  
    console.log(data)
    let data_boti = data.filter(d => d.canal == 'Boti')
    let data_app_ba = data.filter(d => d.canal == 'App BA 147')
    let data_web = data.filter(d => d.canal == 'GCS Web')
    let data_app_denuncia = data.filter(d => d.canal == 'App Denuncia Vial')

    data_boti = d3.groups(data_boti, d => d.fecha_ingreso)

    data_boti = data_boti.map(d => {
      return {
        canal_boti: d[0],
        cant_boti: d[1].length,
      }
    })

    data_app_ba = d3.groups(data_app_ba, d => d.fecha_ingreso)

    data_app_ba = data_app_ba.map(d => {
      return {
        canal_app_ba: d[0],
        cant_app_ba: d[1].length,
      }
    })

    data_web = d3.groups(data_web, d => d.fecha_ingreso)

    data_web = data_web.map(d => {
      return {
        canal_web: d[0],
        cant_web: d[1].length,
      }
    })

    data_app_denuncia = d3.groups(data_app_denuncia, d => d.fecha_ingreso)

    data_app_denuncia = data_app_denuncia.map(d => {
      return {
        canal_app_denuncia: d[0],
        cant_app_denuncia: d[1].length,
      }
    })
 
    let chart = Plot.plot({
      /*
        y: {
          grid: true,
          label: "modo de reclamo"
        },
        */
        marks: [
          Plot.ruleY([0]),
          Plot.line(data_boti, {x: "fecha_ingreso", y: 'cant_boti'}),
          Plot.line(data_app_ba, {x: "fecha_ingreso", y: 'cant_app_ba'}),
          Plot.line(data_web, {x: "fecha_ingreso", y: 'cant_web'}),
          Plot.line(data_app_denuncia, {x: "fecha_ingreso", y: 'cant_app_denuncia'}),
        ],
      })

    d3.select('#chart').append(() => chart)
  })
  
  

