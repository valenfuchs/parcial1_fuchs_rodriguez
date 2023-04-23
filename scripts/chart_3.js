d3.dsv(';','../data/147_15-21_junio.csv', d3.autoType).then(data => {

  data = data.filter(d => d.prestacion == 'VEHÍCULO MAL ESTACIONADO')
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
          
          Plot.text(filteredData,
            Plot.selectLast(
              Plot.groupX(
                { y: 'count' },
                {
                  x: d => d3.timeParse('%d/%m/%Y')(d.fecha_ingreso),
                  text: d => {
                    return d[0].canal // tomo uno de los reclamos del grupo
                  },
                  fill: 'canal',
                  textAnchor: 'start',
                  dx: 3,
              })),
          ),   
        ],

        x: {
          label: " ",
          labelOffset: 40,
          ticks: 5,
          type: 'time',
          time: {
        displayFormats: {
           'millisecond': 'MMM DD',
           'second': 'MMM DD',
           'minute': 'MMM DD',
           'hour': 'MMM DD',
           'day': 'MMM DD',
           'week': 'MMM DD',
           'month': 'MMM DD',
           'quarter': 'MMM DD',
           'year': 'MMM DD',
        }}},
        
        
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
          //padding: '10px',
        },

        width: 600,
        height: 350,
        insetRight:70,
  })

    d3.select('#chart_3').append(() => chart)
  })
  
  

