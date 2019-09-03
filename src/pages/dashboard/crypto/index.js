/* eslint-disable react/destructuring-assignment */
import React from 'react'
import { Form, Input, Button, Row, Col, Icon } from 'antd'
// import style from '../style.module.scss'
// import { Form, Icon, Input, Button } from 'antd';

@Form.create()
class DashboardCrypto extends React.Component {
  onSubmit = event => {
    event.preventDefault()
    const { form } = this.props
    form.validateFields((error, values) => {
      if (!error) {
        console.log(values)
      }
    })
  }

  render() {
    const { form } = this.props

    return (
      <div>
        <div className="pt-5 pb-5 d-flex align-items-end mt-auto">
          <img src="resources/images/air-logo.png" alt="AIR UI Logo" />
          <div className="air__utils__logo__text">
            <div className="air__utils__logo__name text-uppercase text-dark font-size-21">
              FFC
            </div>
            <div className="air__utils__logo__descr text-uppercase font-size-12 text-gray-6">
              Admin template
            </div>
          </div>
        </div>
        <div>
          <div className="text-dark font-size-30 mb-4 text-center"><Icon type="heart" />&nbsp;&nbsp;เยี่ยมบ้าน</div>
          <center>
            <Form style={{maxWidth:500, textAlign:"left"}} layout="vertical" hideRequiredMark onSubmit={this.onSubmit} className="mb-4">
              <Form.Item>
                {form.getFieldDecorator('fullname', {
                  rules: [{ required: true, message: 'กรุณากรอกประเภทการเยี่ยม' }],
                })(<Input size="large" placeholder="ประเภทการเยี่ยม" />)}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('email', {
                  rules: [{ required: true, message: 'กรุณากรอกสภาพ/อาการ ของผู้ป่วย' }],
                })(<Input size="large" placeholder="สภาพ/อาการ ของผู้ป่วย" />)}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('a', {
                  rules: [{ required: true, message: 'กรุณากรอกการให้บริการ' }],
                })(<Input size="large" placeholder="การให้บริการ" />)}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('b', {
                  rules: [{ required: true, message: 'กรุณากรอกการประเมินผล' }],
                })(<Input size="large" placeholder="การประเมินผล" />)}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('c', {
                  rules: [{ required: true, message: 'กรุณากรอกแผนการครั้งต่อไป' }],
                })(<Input size="large" placeholder="แผนการครั้งต่อไป" />)}
              </Form.Item>
              <Form.Item>
                {form.getFieldDecorator('d', {
                  rules: [{ required: true, message: 'กรุณากรอกการนัดเยี่ยมบ้านครั้งต่อไป' }],
                })(<Input size="large" placeholder="นัดเยี่ยมบ้านครังต่อไป" />)}
              </Form.Item>
              
              <p style={{textAlign:"left"}}><strong><Icon type="select" />&nbsp;&nbsp;สัญญาณชีพ</strong></p>
              <p style={{textAlign:"left"}}>ความดันโลหิต</p>
              <Form.Item>
                <Row gutter={8}>
                  <Col span={12}>
                    {form.getFieldDecorator('aa', {
                      rules: [{ required: true, message: 'กรุณากรอกความดันโลหิต' }],
                    })(<Input size="large" placeholder="ตัวบน" />)}
                  </Col>
                  <Col span={12}>
                    {form.getFieldDecorator('ab', {
                        rules: [{ required: true, message: 'Please input' }],
                      })(<Input size="large" placeholder="ตัวล่าง" />)}
                  </Col>
                </Row>
              </Form.Item>
              <Button
                type="button"
                htmlType="submit"
                size="large"
                className="text-center btn btn-success w-100 font-weight-bold font-size-18"
              >
                DONE
              </Button>
            </Form>
          </center>
        </div>
      </div>
    )
  }
}

export default DashboardCrypto
