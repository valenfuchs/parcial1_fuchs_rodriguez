d3.dsv(';','../data/147_vehiculos_mal_estacionados.csv', d3.autoType).then(data => {

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
          
          Plot.text(filteredData, {   //NO FUNCIONAAAAAAAAAAAA
            x: d => d3.timeParse("%d/%m/%Y")(d.fecha_ingreso),
            y:'count',
            text:' d => d.canal',
            textAnchor: 'start',
            dx: 3,
          }),          
        ],

        x: {
          label: " ",
          labelOffset: 40,
          ticks: 5,
        },    
        
        y: {
          label: 'Cantidad de Reclamos',
          labelOffset: 40,
          grid: true,
          ticks: 5,
        },

        color: {
          range: ['#9FE1EE', '#701C7F', '#4F9EC6', '#607FC0']
        },

        style:{
          fontFamily: 'Helvetica',
          fontSize: 14,
          color:'black', 
          padding: '10px',
        },

        width: 700,
        height: 400,
        marginLeft: 80,
        marginTop: 50,
        marginBottom: 20,
      })

    d3.select('#chart_3').append(() => chart)
  })
  
  

