
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
    fetch(`http://localhost:7000/ncd`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          user: json
        });
      })
  }

  render() {
    const { user } = this.state;
    const NCD = user.map(object => ({
      name: object.name,
      y: object.peple,
    }));
    
    
    
    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'โรคเรื้อรัง'
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
        data: NCD
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