
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
            },
            {
              name: "หูหนวก",
              y: 1000,
            },
            {
              name: "ปากแหว่ง",
              y: 767,
            },
            {
              name: "สมอง",
              y: 558,
            },
            {
              name: "ขาขาด",
              y: 402,
            },
            {
              name: "ตาดี",
              y: 192,
            },
            {
              name: "นนนน",
              y: 192,
            },
            {
              name: "จมูกพัง",
              y: 192,
            },
            {
              name: "เท้าเปื่อย",
              y: 192,
            },
            {
              name: "Other",
              y: 762,
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