import React from 'react'
import { Helmet } from 'react-helmet'
// import Chart6 from 'components/widgets/Charts/6'
// import Chart4 from 'components/widgets/Charts/4'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { AutoComplete, Button, Icon, Input } from 'antd';

class DashboardAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pyramid01: [],
      user: [],
      chronic: [],
      hospital: '',
      isLoaded: false,
      error: null,
    }
    this.handleValidSubmit = this.handleValidSubmit.bind(this);
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
          pyramid01: json,
          isLoaded: true,
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
    // pie อัตราส่วนผู้สูงอายุ
    fetch(`http://localhost:7000/elderlyrat`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          user: json,
          isLoaded: true
        });
      })

    // piechart โรคเรื้อรัง
    fetch(`http://localhost:7000/chronic`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          chronic: json,
          isLoaded: true
        });
      })
  }

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

      fetch(`http://localhost:7000/elderlyrat/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            user: json,
            hospital: value
          });
        })

      fetch(`http://localhost:7000/chronic/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            chronic: json,
            hospital: value
          });
        })
    }
  }

  render() {
    const {
      pyramid01,
      dataSource,
      chronic,
      hospital,
      user,
      isLoaded,
      error
    } = this.state;
    console.log(chronic, 'chronic');
    const name = dataSource.map(object => object.name);
    const submit = this.handleValidSubmit;
    function refreshPage() {
      window.location.reload();
      console.log(refreshPage, 'option');

    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } if (!isLoaded) {
      return <div>Loading...</div>;
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
    const active = user.byActive;
    const piechronic = chronic.byIcd10
    // const name1 = chronic.byIcd10[0].name
    // console.log(name1,'4544664');

    if (piechronic !== undefined) {
      const chronicpiechart = piechronic.map(object => ({
        name: object.name,
        y: object.y,
      }));
    
      if (active !== undefined) {
        const data1 = active.map(object => ({
          name: object.name,
          y: object.peple,
        }));
        console.log(data1, 'dlfkfjkfjf');

        if (myArrStr !== undefined) {
          const age = myArrStr.map(item => { return item.age })
          const female = myArrStr.map(item => { return item.female })
          const male = myArrStr.map(item => -Math.abs((item.male)))

          Highcharts.setOptions({
            lang: {
              thousandsSep: ','
            }
          });

          // ปิรามิดประชากร ทั้งหมด
          const optionspyramid = {
            chart: {
              type: 'bar',
              // plotBackgroundImage: 'resources/images/bg_pop.png'
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
                  return Math.abs(this.value)
                }
              }
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

          // piechart ผู้สูงอายุ 60 ปีขึ้นไป
          const pieChartelderly = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            credits: {
              enabled: false
            },
            colors: ['rgb(144, 237, 125)', 'rgb(247, 163, 92)', '#FF4560', '#333333',],
            title: {
              text: 'กลุ่มผู้สูงอายุ 60 ปีขึ้นไป'
            },
            tooltip: {
              pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
              pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
              }
            },
            series: [{
              name: 'จำนวน',
              colorByPoint: true,
              data: data1
            }]
          }

          const pieChartchronics = {
            chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              type: 'pie'
            },
            credits: {
              enabled: false
            },
            colors: ['rgb(144, 237, 125)', 'rgb(247, 163, 92)', '#FF4560', '#333333',],
            title: {
              text: 'กลุ่มผู้สูงอายุ'
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
                // showInLegend: true
              }
            },
            series: [{
              name: 'จำนวน',
              colorByPoint: true,
              data: chronicpiechart
            }]
          }

          // piechart ผู้ป่วยโรคเรื้อรัง
          // const pieChartchronics = {
          //   chart: {
          //     plotBackgroundColor: null,
          //     plotBorderWidth: null,
          //     plotShadow: false,
          //     type: 'pie'
          //   },
          //   credits: {
          //     enabled: false
          //   },
          //   // colors: ['rgb(144, 237, 125)', 'rgb(247, 163, 92)', '#FF4560', '#333333',],
          //   title: {
          //     text: 'กลุ่มผู้ป่วยโรคเรื้อรัง'
          //   },
          //   tooltip: {
          //     pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          //   },
          //   plotOptions: {
          //     pie: {
          //       allowPointSelect: true,
          //       cursor: 'pointer',
          //       dataLabels: {
          //         enabled: true,
          //         format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          //       }
          //     }
          //   },
          //   series: [{
          //     name: 'จำนวน',
          //     colorByPoint: true,
          //     data: chronicpiechart
          //   }]
          // }

          return (
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <Complete />&nbsp; &nbsp; &nbsp;
                  <Button type="button" onClick={refreshPage}> <span>หน่วยงานทั้งหมด</span> </Button>
                </div>
              </div>
              <div className="col-xl-12">
                <br />
                <br />
                <br />
                <div className="card">
                  <div className="card-body">
                    <HighchartsReact highcharts={Highcharts} options={optionspyramid} loading={isLoaded} style={{ width: "100%", height: "400px" }} />
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
                      {(pyramid01.total !== 0) && (
                        <div className="mr-5 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut--success" />
                            ประชากรทั้งหมด
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{pyramid01.total.toLocaleString()}</div>
                        </div>
                      )
                      }
                      <div className="mr-5 mb-2">
                        <div className="text-nowrap text-uppercase text-gray-4">
                          <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#ffff99' }} />
                          รายงานเมื่อ
                        </div>
                        <div className="font-weight-bold font-size-18 text-dark">{pyramid01.date}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <br />
              <div className="row">
                <div className="col-xl-6 col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <HighchartsReact highcharts={Highcharts} options={pieChartchronics} style={{ width: "100%", height: "400px" }} />
                      <div>
                        <div className="mb-3">
                          <div className="table-responsive">
                            <table className="table table-borderless text-gray-6 mb-0">
                              <tbody>
                                <tr>
                                  <td className="text-nowrap">
                                    <div className="air__utils__donut air__utils__donut--danger mr-3" />
                                    {chronic.byIcd10[0].name}
                                  </td>
                                  <td className="text-right">
                                    <strong>{chronic.byIcd10[0].y.toLocaleString()}</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-nowrap">
                                    <div className="air__utils__donut air__utils__donut--primary mr-3" />
                                    {chronic.byIcd10[1].name}
                                  </td>
                                  <td className="text-right">
                                    <strong>{chronic.byIcd10[1].y.toLocaleString()}</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-nowrap">
                                    <div className="air__utils__donut air__utils__donut--success mr-3" />
                                    {chronic.byIcd10[2].name}
                                  </td>
                                  <td className="text-right">
                                    <strong>{chronic.byIcd10[2].y.toLocaleString()}</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-nowrap">
                                    <div className="air__utils__donut air__utils__donut--info mr-3" />
                                    {chronic.byIcd10[3].name}
                                  </td>
                                  <td className="text-right">
                                    <strong>{chronic.byIcd10[3].y.toLocaleString()}</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-nowrap">
                                    <div className="air__utils__donut air__utils__donut--orange mr-3" />
                                    {chronic.byIcd10[4].name}
                                  </td>
                                  <td className="text-right">
                                    <strong>{chronic.byIcd10[4].y.toLocaleString()}</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-nowrap">
                                    <div className="air__utils__donut air__utils__donut--orange mr-3" />
                                    อื่นๆ
                                  </td>
                                  <td className="text-right">
                                    <strong>{chronic.other}</strong>
                                  </td>
                                </tr>
                                <tr>
                                  <td className="text-nowrap">
                                    <div className="air__utils__donut air__utils__donut--orange mr-3" />
                                    จำนวนทั้งหมด
                                  </td>
                                  <td className="text-right">
                                    <strong>{chronic.total}</strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-6">
                  <div className="card">
                    <div className="card-body">
                      <HighchartsReact highcharts={Highcharts} options={pieChartelderly} style={{ width: "100%", height: "400px" }} />
                      <div className="d-flex flex-wrap">
                        <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut" style={{ borderColor: 'rgb(144, 237, 125)' }} />
                            ติดสังคม
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.OK.toLocaleString()}</div>
                        </div>
                        <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut" style={{ borderColor: 'rgb(247, 163, 92)' }} />
                            ติดบ้าน
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.MID.toLocaleString()}</div>
                        </div>
                        {/* {(user.VERYHI !== 0) && ( */}
                        <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#FF4560' }} />
                            ติดเตียง
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.VERYHI.toLocaleString()}</div>
                        </div>
                        {/* )
                      } */}
                        <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#333333' }} />
                            ไม่ระบุ
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.UNKNOWN.toLocaleString()}</div>
                        </div>
                        <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut--success" />
                            จำนวนทั้งหมด
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.total.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      }
    }
    return (
      <div>
        {isLoaded}
        <Helmet title="Dashboard: Analytics" />
      </div>
    )
  }
}

export default DashboardAnalytics
