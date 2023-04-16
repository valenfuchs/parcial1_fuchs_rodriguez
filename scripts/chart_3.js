d3.dsv(';','/data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

  filteredData = data.filter(d => d.canal == 'App Denuncia Vial'||d.canal == 'GCS Web'||d.canal == 'Boti'||d.canal == 'App BA 147')

    let chart = Plot.plot({
        marks: [
          Plot.ruleY([0]),
          Plot.line(filteredData,
            Plot.groupX(
              {y: 'count'},
              {
                x: d => d3.timeParse("%d/%m/%Y")(d.fecha_ingreso),
                stroke: 'canal',
                curve: 'natural', 
                strokeWidth: 3,
                opacity: 0.8,  
              },
            ),
          ),
          
          Plot.text(filteredData, {
            x: d => d3.timeParse("%d/%m/%Y")(d.fecha_ingreso),
            y: 'count',
            text: d => d.canal,
            textAnchor: 'start',
            dx: 10,
            dy: -10,
            fontSize: 12,
            fill: 'black',
          }),
        ],

        x: {
          label: 'Fecha de Ingreso',
          labelOffset: 40,
        },
      
        y: {
          label: 'Cantidad de Reclamos',
          labelOffset: 40,
          grid: true
        },

        color: {
          range: ['#9FE1EE', '#701C7F', '#4F9EC6', '#607FC0']
        },

        style:{
          fontFamily: 'Tahoma',
          fontSize: 14,
          color:'black', 
          padding: '10px',
        },

        width: 700,
        height: 500,
        marginLeft: 80,
        marginTop: 50,
        marginBottom: 100,

     
      })

    d3.select('#chart').append(() => chart)
  })
  
  

