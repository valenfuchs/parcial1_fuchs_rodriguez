d3.dsv(';','/data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

  data = data.filter(d => d.canal == 'App Denuncia Vial'||d.canal == 'GCS Web'||d.canal == 'Boti'||d.canal == 'App BA 147')
 
    let chart = Plot.plot({
        marks: [
          Plot.ruleY([0]),
          Plot.line(data,
            Plot.groupX(
              {y: 'count'},
              {
                x: d => d3.timeParse("%d/%m/%Y")(d.fecha_ingreso),
                stroke: 'canal',
                curve: 'natural'  
              },
            ),
          ),
          
          /*Plot.text(
            data,
            Plot.groupX(
              {y: 'count'
              //, text: 'canal',
            },
              {
                x:  d => d3.timeParse("%d/%m/%Y")(d.fecha_ingreso),
                textAnchor: 'start',
                dx: 5,
                dy: -5,
                fill: 'canal',
              },
            ),
          ),
          */
        ],

        

        color: {
          scheme: 'bupu',
          legend: true,
        },
     
      })
    d3.select('#chart').append(() => chart)
  })
  
  

