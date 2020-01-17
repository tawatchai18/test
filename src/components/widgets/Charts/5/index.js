import React from 'react'
// import { Helmet } from 'react-helmet'
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";
// import drilldow from "highcharts/modules/drilldown";
import { Table } from 'antd'

class Chart5 extends React.Component {
  componentDidMount() {

  }

  render() {
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        render: text => <a>{text}</a>,
      },
      {
        title: 'Cash Assets',
        className: 'column-money',
        dataIndex: 'money',
      },
      {
        title: 'Address',
        dataIndex: 'address',
      },
    ];

    const data = [
      {
        key: '1',
        name: 'John Brown',
        money: '￥300,000.00',
        address: 'New York No. 1 Lake Park',
      },
      {
        key: '2',
        name: 'Jim Green',
        money: '￥1,256,000.00',
        address: 'London No. 1 Lake Park',
      },
      {
        key: '3',
        name: 'Joe Black',
        money: '￥120,000.00',
        address: 'Sidney No. 1 Lake Park',
      },
    ];
    return (
      <div>
        <div className="col-xl-12">
          <Table
            columns={columns}
            dataSource={data}
            bordered
          />
        </div>
      </div>
    )
  }
}

export default Chart5
