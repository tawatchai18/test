
import React, { Component } from "react";
import Highcharts from "highcharts";

import BarChart from "highcharts-react-official";

class Chart6 extends Component {
  render() {
    const options = {
      chart: {
        type: 'column'
      },
      title: {
        text: 'ประเภทผู้พิการ'
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'ประเภทผู้พิการ'
        }

      },
      legend: {
        enabled: false
      },
      plotOptions: {
        series: {
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}'
          }
        }
      },

      tooltip: {
        // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b>คน<br/>'
      },

      series: [
        {
          name: "Browsers",
          colorByPoint: true,
          data: [
            {
              name: "ตาบอด",
              y: 900,
              drilldown: "ตาบอด"
            },
            {
              name: "หูหนวก",
              y: 1000,
              drilldown: "หูหนวก"
            },
            {
              name: "ปากแหว่ง",
              y: 767,
              drilldown: "ปากแหว่ง"
            },
            {
              name: "สมอง",
              y: 558,
              drilldown: "สมอง"
            },
            {
              name: "Edge",
              y: 402,
              drilldown: "Edge"
            },
            {
              name: "Opera",
              y: 192,
              drilldown: "Opera"
            },
            {
              name: "Other",
              y: 762,
              drilldown: null
            }
          ]
        }
      ]
    };

    return (
      <div>
        <center>
          <BarChart highcharts={Highcharts} options={options} />
        </center>
      </div>
    );
  }
}

export default Chart6