import React from 'react'
import { Helmet } from 'react-helmet'
import Chart6 from 'components/widgets/Charts/6'
import Chart4 from 'components/widgets/Charts/4'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { AutoComplete, Button, Icon, Input } from 'antd';
// import Select from 'react-select';

// const { Option } = Select;

class DashboardAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pyramid01: [],
      hospital: '',
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {

    // ชื่อกับ id
    fetch(`http://localhost:7000/convert`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          dataSource: json
        });
      })

    // กราฟ ปิรามิด
    fetch(`http://localhost:7000/pyramid`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pyramid01: json
        });
      })
  }

  onChange() {
    fetch(`http://localhost:7000/pyramid`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pyramid01: json,
        });
        console.log(json, '====010101');
      })
  }

  // handleSubmit(value) {
  //     fetch(`http://localhost:7000/pyramid`)
  //       .then(res => res.json())
  //       .then(json => {
  //         this.setState({
  //           pyramid01: json,
  //           hospital: value
  //         });
  //         console.log(json, '====');
  //       })
  //   }


  handleValidSubmit(value) {
    const { dataSource } = this.state;
    const organization = dataSource.find((item) => {
      return item.name === value
    })
    if (organization !== undefined) {
      const idOption = organization.id
      console.log(idOption, 'ooooo');
      fetch(`http://localhost:7000/pyramid/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            pyramid01: json,
            hospital: value
          });
          console.log(json, '====');
        })
    }
  }

  render() {
    const {
      pyramid01,
      dataSource,
      hospital,
    } = this.state;
    // const data = dataSource.map(object => ({
    //   value: object.name,
    //   label: object.name,
    // }));
    const name = dataSource.map(object => object.name);
    const submit = this.handleValidSubmit;
    // const onSubmit = this.onChange
    function refreshPage() {
      window.location.reload();
      console.log(refreshPage, 'option');

    }

    function Complete() {
      return (
        <AutoComplete
          style={{ width: 400, Color: '#000' }}
          onChange={submit}
          dataSource={name}
          defaultValue={hospital}
          placeholder="ค้นหาหน่วยงาน"
          filterOption={(inputValue, option) =>
            option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Input suffix={<Icon type="search" className="certain-category-icon" />} />
        </AutoComplete>
      );
    }

    // กราฟ ปิรามิด
    const myArrStr = pyramid01.byAge;
    if (myArrStr !== undefined) {
      const age = myArrStr.map(item => { return item.age })
      const female = myArrStr.map(item => { return item.female })
      const male = myArrStr.map(item => -Math.abs((item.male)))

      Highcharts.setOptions({
        lang: {
          thousandsSep: ','
        }
      });
      const options1 = {
        chart: {
          type: 'bar',
          backgroundImage: "url('resources/images/bg_pop.png')"
        },
        credits: {
          enabled: false
        },
        colors: ['#008FFB', '#FF4560'],
        title: {
          text: 'ปิรามิดประชากร',
        },
        subtitle: {
          text: null
        },
        xAxis: [{
          categories: age,
          reversed: false,
          labels: {
            step: 1
          }
        }, { // อายุอีกฝั่ง
          opposite: true,
          reversed: false,
          categories: age,

          linkedTo: 0,
          labels: {
            step: 1
          }
        }],
        yAxis: {
          title: {
            text: null
          },
          labels: {
            formatter() {
              return Math.abs(this.value);
            }
          },
          // min: -100 *500,
          // max: 100 *500,
        },
        plotOptions: {
          series: {
            stacking: 'normal',
          }
        },
        lang: {
          thousandsSep: ','
        },
        tooltip: {
          formatter() {
            return `<b>${this.series.name}, ช่วงอายุ ${this.point.category}</b><br/>` +
              `จำนวน:${Highcharts.numberFormat(Math.abs(this.point.y), 0)}`;
          }
        },
        series: [
          {
            name: "ชาย",
            data: male,
          },
          {
            name: "หญิง",
            data: female
          }
        ]
      }
      return (
        <div>
          <div className="row">
            <div className="col-lg-12">
              {/* {hospital} */}
              <Complete />&nbsp; &nbsp; &nbsp;
              {/* <Button onClick={onSubmit}>หน่วยงานทั้งหมด</Button> */}
              <Button type="button" onClick={refreshPage}> <span>หน่วยงานทั้งหมด</span> </Button>
            </div>
          </div>
          <div className="col-xl-12">
            <br />
            <br />
            <br />
            <div className="card">
              <div className="card-body">
                <HighchartsReact highcharts={Highcharts} options={options1} style={{ width: "100%", height: "400px" }} />
                <div className="d-flex flex-wrap">
                  <div className="mr-5 mb-2">
                    <div className="text-nowrap text-uppercase text-gray-4">
                      <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#008ffb' }} />
                      ชาย
                    </div>
                    <div className="font-weight-bold font-size-18 text-dark">{pyramid01.male.toLocaleString()}</div>
                  </div>
                  <div className="mr-5 mb-2">
                    <div className="text-nowrap text-uppercase text-gray-4">
                      <div className="air__utils__donut air__utils__donut--danger" />
                      หญิง
                    </div>
                    <div className="font-weight-bold font-size-18 text-dark">{pyramid01.female.toLocaleString()}</div>
                  </div>
                  <div className="mr-5 mb-2">
                    <div className="text-nowrap text-uppercase text-gray-4">
                      <div className="air__utils__donut air__utils__donut--secondary" />
                      ไม่ระบุเพศ
                    </div>
                    <div className="font-weight-bold font-size-18 text-dark">{pyramid01.undefinedSex.toLocaleString()}</div>
                  </div>
                  <div className="mr-5 mb-2">
                    <div className="text-nowrap text-uppercase text-gray-4">
                      <div className="air__utils__donut air__utils__donut--success" />
                      ประชากรทั้งหมด
                    </div>
                    <div className="font-weight-bold font-size-18 text-dark">{pyramid01.total.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              {/* <h5 className="text-dark mb-4">อัตราส่วนผู้สูงอายุ</h5> */}
              <div className="card">
                <Chart6 />
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              {/* <h5 className="text-dark mb-4">อัตราส่วนผู้สูงอายุ</h5> */}
              <div className="card">
                <Chart4 />
              </div>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <Helmet title="Dashboard: Analytics" />
      </div>
    )
  }
}

export default DashboardAnalytics
