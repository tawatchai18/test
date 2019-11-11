
import React, { Component } from "react";
import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

import PieChart from "highcharts-react-official";

class Chart4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],

    }
  }

  componentDidMount() {
    fetch(`http://localhost:7000/elderlyrat`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          user: json
        });
      })
  }

  render() {
    const { user } = this.state;
    const nameold = user.map(object => object.name);
    const peple = user.map(object => object.peple);
    console.log(nameold, peple, 'popop');
    console.log(user ,'user');
    
    
    
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'โรค NCD'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          showInLegend: true
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
          name: 'โรคเบาหวาน (Diabetes Mellitus)',y: 61.41,
          sliced: true,
          selected: true
        },
          { name: 'โรคหลอดเลือดสมองและหัวใจ', y: 10.85 },
          { name: 'โรคถุงลมโป่งพอง', y: 4.67 },
          { name: 'โรคมะเร็ง (Cancer)', y: 4.18 },
          { name: 'โรคความดันโลหิตสูง', y: 4.18 },
          { name: 'โรคอ้วนลงพุง', y: 4.18 },
        ]
      }]
    };

    return (
      <div>
        <center>
          <PieChart highcharts={Highcharts} options={options} />
        </center>
      </div>
    );
  }
}

export default Chart4