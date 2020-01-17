import React from 'react'
import { Helmet } from 'react-helmet'
import Chart1 from 'components/widgets/Charts/1'
import { AutoComplete, Button, Icon, Input, Tabs } from 'antd';
import Chart2 from 'components/widgets/Charts/2';
import Chart3 from 'components/widgets/Charts/3';
import Chart4 from 'components/widgets/Charts/4';
// import Chart5 from 'components/widgets/Charts/5';
import General2 from 'components/widgets/General/2'
import General3 from 'components/widgets/General/3'
// import moment from 'moment-timezone'

const { TabPane } = Tabs

class DashboardAnalytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      pyramid01: [],
      pyramid60up: [],
      chronic: [],
      chronicdilldown: [],
      user: [],
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

    fetch(`http://localhost:7000/report/pyramid60up`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          pyramid60up: json,
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
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    // piechart โรคเรื้อรัง
    fetch(`http://localhost:7000/report/chronic`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          chronic: json,
          isLoaded: true
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

    // piechronicdilldown โรคเรื้อรัง
    fetch(`http://localhost:7000/report/chronicdilldown`)
      .then(res => res.json())
      .then(json => {
        this.setState({
          chronicdilldown: json,
          isLoaded: true
        });
      },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  handleValidSubmit(value) {
    const { dataSource } = this.state;
    const organization = dataSource.find((item) => {
      return item.name === value
    })
    if (organization !== undefined) {
      const idOption = organization.id

      fetch(`http://localhost:7000/report/pyramid/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            pyramid01: json,
            hospital: value
          });
        })

      fetch(`http://localhost:7000/report/pyramid60up/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            pyramid60up: json,
            hospital: value
          });
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

      fetch(`http://localhost:7000/report/chronicdilldown/${idOption}`)
        .then(res => res.json())
        .then(json => {
          this.setState({
            chronicdilldown: json,
            hospital: value
          });
        })
    }
  }

  render() {
    const { dataSource, chronic, pyramid01, pyramid60up, user, hospital, isLoaded, chronicdilldown, error } = this.state;
    const name = dataSource.map(object => object.name);
    const oo = name.length
    const submit = this.handleValidSubmit;

    function Complete() {
      return (
        <AutoComplete
          style={{ width: 350, Color: '#000' }}
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

    function refreshPage() {
      window.location.reload();

    }
    if (error) {
      return <div>Error: {error.message}</div>;
    } if (!isLoaded) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        {isLoaded}
        <Helmet title="Family Folder Collector" />
        <div>
          <Complete />&nbsp; &nbsp; &nbsp;
          <Button type="button" onClick={refreshPage}> <span>หน่วยงานทั้งหมด</span> </Button>
        </div>
        <br />
        <p style={{ color: '#ff8080' }}>*** รายงานข้อมูลชุมชน จะปรับปรุงทุกๆ 6 ชั่วโมง ***</p>
        {/* <Chart4 length={oo} /> */}
        {/* <br /> */}
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <Chart1 submit={submit} pyramid01={pyramid01} namehospital={hospital} length={oo} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-body">
                <General2 length={oo} />
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <div className="card">
              <div className="card-body">
                <General3 pyramid60up={pyramid60up} user={user} isLoaded={isLoaded} error={error} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body">
                <Tabs defaultActiveKey="1" className="air-tabs-bold">
                  <TabPane tab="จำนวนผู้ป่วยโรคเรื้อรังแยกตามกลุ่มโรค" key="1">
                    <Chart4 namehospital={hospital} chronicdilldown={chronicdilldown} submit={submit} />
                  </TabPane>
                  <TabPane tab="จำนวนผู้ป่วยโรคเรื้อรังแยกตามรายโรค" key="2">
                    <Chart3 namehospital={hospital} chronic={chronic} submit={submit} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          {/* <div className="col-xl-6">
            <div className="card">
              <div className="card-body">
                <Chart3 submit={submit} chronic={chronic} namehospital={hospital} />
              </div>
            </div>
          </div> */}
          <div className="col-xl-6">
            <div className="card">
              <div className="card-body">
                <Chart2 submit={submit} user={user} namehospital={hospital} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="row">
          <div className="col-xl-6">
            <div className="card">
              <div className="card-body">
                <Chart5 />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default DashboardAnalytics
