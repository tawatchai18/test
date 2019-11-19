import React from 'react'
import { Helmet } from 'react-helmet'
// import Chart6 from 'components/widgets/Charts/6'
// import Chart4 from 'components/widgets/Charts/4'
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { AutoComplete, Button, Icon, Input, Table, Collapse } from 'antd';

const { Panel } = Collapse;

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
    fetch(`http://localhost:7000/report/convert`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          dataSource: json
        });
      })

    // กราฟ ปิรามิด
    fetch(`http://localhost:7000/report/pyramid`)
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
    fetch(`http://localhost:7000/report/elderlyrat`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          user: json,
          isLoaded: true
        });
      })

    // piechart โรคเรื้อรัง
    fetch(`http://localhost:7000/report/chronic`)
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
      fetch(`http://localhost:7000/report/pyramid/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            pyramid01: json,
            hospital: value
          });
          console.log(json, '====');
        })

      fetch(`http://localhost:7000/report/elderlyrat/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            user: json,
            hospital: value
          });
        })

      fetch(`http://localhost:7000/report/chronic/${idOption}`)
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

    function callback(key) {
      console.log(key);
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

    if (piechronic !== undefined) {
      piechronic.map(item => (
        console.log(item.y, 'popiij')
      ));

      const chronicpiechart = piechronic.map(object => ({
        name: object.name,
        y: object.y,
      }));
      const columns = [
        // {
        //   title: "ลำดับ",
        //   dataIndex: 'key'
        // },
        {
          title: 'ชื่อ',
          dataIndex: 'name',
          key: '1',
        },
        {
          title: 'จำนวน',
          dataIndex: 'y',
          key: '1',
        },
      ];

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
              text: hospital !== '' ? `ปิรามิดประชากร</b></b></br><br/>${hospital}` : 'ปิรามิดหน่วยงานทั้งหมด',
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
              // text: `กลุ่มผู้สูงอายุ 60 ปีขึ้นไป</b></br><br/>${hospital}`
              text: hospital !== '' ? `กลุ่มผู้สูงอายุ 60 ปีขึ้นไป</b></br><br/>${hospital}` : 'กลุ่มผู้สูงอายุ 60 ปีขึ้นไป</br></br>หน่วยงานทั้งหมด',
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
            colors: ['rgb(144, 237, 125)', 'rgb(247, 163, 92)', '#FF4560', '#333333', '#008FFB'],
            title: {
              // text: `ผู้ป่วยโรคเรื้อรัง</br></b><br/>${hospital}`
              text: hospital !== '' ? `ผู้ป่วยโรคเรื้อรัง</b></br><br/>${hospital}` : 'ผู้ป่วยโรคเรื้อรังทั้งหมด',
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
                      {/* {(pyramid01.total !== 0) && ( */}
                      <div className="mr-5 mb-2">
                        <div className="text-nowrap text-uppercase text-gray-4">
                          <div className="air__utils__donut air__utils__donut--success" />
                          ประชากรทั้งหมด
                        </div>
                        <div className="font-weight-bold font-size-18 text-dark">{pyramid01.total.toLocaleString()}</div>
                      </div>
                      {/* ) */}
                      {/* } */}
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
                      <Collapse onChange={callback}>
                        <Panel header="จำนวนผู้ป่วยโรคเรื้อรัง (กดดูรายละเอียด)" key="1">
                          <Table dataSource={chronicpiechart} columns={columns} bordered />
                        </Panel>
                      </Collapse>
                    </div>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-5">
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
                        <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#FF4560' }} />
                            ติดเตียง
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.VERYHI.toLocaleString()}</div>
                        </div>
                        <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut" style={{ borderColor: '#333333' }} />
                            ไม่ระบุ
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.UNKNOWN.toLocaleString()}</div>
                        </div>
                        {/* <div className="mr-4 mb-2">
                          <div className="text-nowrap text-uppercase text-gray-4">
                            <div className="air__utils__donut air__utils__donut--success" />
                            จำนวนทั้งหมด
                          </div>
                          <div className="font-weight-bold font-size-18 text-dark">{user.total.toLocaleString()}</div>
                        </div> */}
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
