// import React from 'react'
// import { Tabs } from 'antd'
// import PingPong from './pingpong'
// import Elderly from './elderly'
// import Symptom from './symptom'
// import Aa from './aa'

// const { TabPane } = Tabs;

// function callback(key) {
//   console.log(key);
// }

// class DashboardCrypto extends React.Component {
//   render() {
//     const Demo = () => (
//       <Tabs defaultActiveKey="1" onChange={callback}>
//         <TabPane tab="ปิงปองจราจร 7 สี" key="1">
//           <br />
//           <PingPong />
//         </TabPane>
//         <TabPane tab="ผู้สูงอายุ" key="2">
//           <Elderly />
//         </TabPane>
//         <TabPane tab="สุขภาวะ/อาการ" key="3">
//           <Symptom />
//         </TabPane>
//         <TabPane tab="เทส" key="4">
//           <Aa />
//         </TabPane>
//       </Tabs>
//     );

//     return (
//       <div style={{ width: '100%', height: '100%' }}>
//         <Demo />
//       </div>
//     )

//   }
// }
// export default DashboardCrypto

import React from 'react'
import { Tabs } from 'antd'
import PingPong from './pingpong'
import Elderly from './elderly'
import Symptom from './symptom'
import Aa from './aa'

const { TabPane } = Tabs

function callback(key) {
  console.log(key)
}

class DashboardCrypto extends React.Component {
  render() {
    const Demo = () => (
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="ปิงปองจราจร 7 สี" key="1">
          <br />
          <PingPong />
        </TabPane>
        <TabPane tab="ผู้สูงอายุ" key="2">
          <Elderly />
        </TabPane>
        <TabPane tab="สุขภาวะ/อาการ" key="3">
          <Symptom />
        </TabPane>
        <TabPane tab="เทส" key="4">
          <Aa />
        </TabPane>
      </Tabs>
    )

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Demo />
      </div>
    )
  }
}
export default DashboardCrypto
