import React, { Component } from 'react';
import { Steps, Button, message, Row, Col, Form, Input, Radio, Icon, Modal, Tabs, Select, Switch, InputNumber, Table } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { Map, Marker } from 'react-amap';

import styles from './index.less';

const { Step } = Steps;
const { TabPane } = Tabs;
const { Option } = Select;

export type markerProps = [number, number];

interface AddSingleTermialProps extends FormComponentProps {
  backTermial: React.MouseEvent;
}

interface AddSingleTermialState {
  addSingleTermialCurrent: number;
  mapVisible: boolean;
  markerInfo: markerProps;
  markerName: string;
  markerPos: string;
}

class AddSingleTermial extends Component<AddSingleTermialProps, AddSingleTermialState> {
  state: AddSingleTermialState = {
    addSingleTermialCurrent: 0,
    mapVisible: false,
    markerInfo: [0, 0],
    markerName: '',
    markerPos: ''
  }

  next() {
    this.props.form.validateFields(['name', 'model', 'eui'], (err, values) => {
      if (!err) {
        const current = this.state.addSingleTermialCurrent + 1;
        this.setState({ addSingleTermialCurrent: current });
      }
    });
  }

  prev() {
    const current = this.state.addSingleTermialCurrent - 1;
    this.setState({ addSingleTermialCurrent: current });
  }

  handleComplete = () => {
    message.success('添加设备成功');
    const { backTermial } = this.props;
    backTermial();
  }

  renderBasicParameters() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 8 },
      },
    };

    return (
      <div className={styles.tabContainer}>
        <Form {...formItemLayout}>
          <Form.Item label="终端名称">
            {getFieldDecorator('name', {
              rules: [
                {
                  required: true,
                  message: '终端名称不能为空'
                },
              ],
            })(<Input placeholder="请输入终端名称" />)}
          </Form.Item>
          <Form.Item label="终端型号">
            {getFieldDecorator('model', {
              rules: [
                {
                  required: true,
                  message: '终端型号不能为空'
                },
              ],
            })(<Input placeholder="请输入终端型号" />)}
          </Form.Item>
          <Form.Item label="终端接入方式">
            <span>LoRa</span>
          </Form.Item>
          <Form.Item label="字节序">
            <Radio defaultChecked disabled>大端序</Radio>
            <Radio defaultChecked={false} disabled>小端序</Radio>
          </Form.Item>
          <Form.Item label="终端标识内容（DEVEUI）">
            {getFieldDecorator('eui', {
              rules: [
                {
                  required: true,
                  message: '终端标识内容不能为空'
                },
              ],
            })(<Input placeholder="格式：XX-XX-XX-XX-XX-XX-XX-XX" />)}
          </Form.Item>
          <Form.Item label="终端坐标">
            <Input placeholder="请选择终端坐标" suffix={<Icon type="environment"/>} value={this.state.markerPos} onClick={this.handleMapSelect}/>
          </Form.Item>
          <Form.Item label="位置备注">
            <Input placeholder="详细描述终端位置信息，如X号楼X层XXX房间" />
          </Form.Item>
        </Form>
      </div>
    );
  }

  renderLoRaParameters() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 8 },
      },
    };

    const columns = [
      {
        title: '信道',
        dataIndex: 'channel',
        key: 'channel',
      },
      {
        title: '中心频率(MHz)',
        dataIndex: 'frequency',
        key: 'frequency',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (sts: any) => <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={sts} />
      },
    ];

    const dataSource1 =[
      {
        key: '0',
        channel: '0',
        frequency: '470.3',
        status: true,
      },
      {
        key: '1',
        channel: '1',
        frequency: '470.5',
        status: true,
      },
      {
        key: '2',
        channel: '2',
        frequency: '470.7',
        status: true,
      },
      {
        key: '3',
        channel: '3',
        frequency: '470.9',
        status: true,
      },
      {
        key: '4',
        channel: '4',
        frequency: '471.1',
        status: true,
      },
      {
        key: '5',
        channel: '5',
        frequency: '471.3',
        status: true,
      },
      {
        key: '6',
        channel: '6',
        frequency: '471.5',
        status: true,
      },
      {
        key: '7',
        channel: '7',
        frequency: '471.7',
        status: true,
      },
    ];

    const dataSource2 =[
      {
        key: '8',
        channel: '8',
        frequency: '471.9',
        status: true,
      },
      {
        key: '9',
        channel: '9',
        frequency: '472.1',
        status: true,
      },
      {
        key: '10',
        channel: '10',
        frequency: '472.3',
        status: true,
      },
      {
        key: '11',
        channel: '11',
        frequency: '472.5',
        status: true,
      },
      {
        key: '12',
        channel: '12',
        frequency: '472.7',
        status: true,
      },
      {
        key: '13',
        channel: '13',
        frequency: '472.9',
        status: true,
      },
      {
        key: '14',
        channel: '14',
        frequency: '473.1',
        status: true,
      },
      {
        key: '15',
        channel: '15',
        frequency: '473.3',
        status: true,
      },
    ];

    const dataSource3 =[
      {
        key: '16',
        channel: '16',
        frequency: '473.5',
        status: true,
      },
      {
        key: '17',
        channel: '17',
        frequency: '473.7',
        status: true,
      },
      {
        key: '18',
        channel: '18',
        frequency: '473.9',
        status: true,
      },
      {
        key: '19',
        channel: '19',
        frequency: '474.1',
        status: true,
      },
      {
        key: '20',
        channel: '20',
        frequency: '474.3',
        status: true,
      },
      {
        key: '21',
        channel: '21',
        frequency: '474.5',
        status: true,
      },
      {
        key: '22',
        channel: '22',
        frequency: '474.7',
        status: true,
      },
      {
        key: '23',
        channel: '23',
        frequency: '474.9',
        status: true,
      },
    ];

    const dataSource4 =[
      {
        key: '24',
        channel: '24',
        frequency: '475.1',
        status: true,
      },
      {
        key: '25',
        channel: '25',
        frequency: '475.3',
        status: true,
      },
      {
        key: '26',
        channel: '26',
        frequency: '475.5',
        status: true,
      },
      {
        key: '27',
        channel: '27',
        frequency: '475.7',
        status: true,
      },
      {
        key: '28',
        channel: '28',
        frequency: '475.9',
        status: true,
      },
      {
        key: '29',
        channel: '29',
        frequency: '476.1',
        status: true,
      },
      {
        key: '30',
        channel: '30',
        frequency: '476.3',
        status: true,
      },
      {
        key: '31',
        channel: '31',
        frequency: '476.5',
        status: true,
      },
    ];

    const dataSource5 =[
      {
        key: '32',
        channel: '32',
        frequency: '476.7',
        status: true,
      },
      {
        key: '33',
        channel: '33',
        frequency: '476.9',
        status: true,
      },
      {
        key: '34',
        channel: '34',
        frequency: '477.1',
        status: true,
      },
      {
        key: '35',
        channel: '35',
        frequency: '477.3',
        status: true,
      },
      {
        key: '36',
        channel: '36',
        frequency: '477.5',
        status: true,
      },
      {
        key: '37',
        channel: '37',
        frequency: '477.7',
        status: true,
      },
      {
        key: '38',
        channel: '38',
        frequency: '477.9',
        status: true,
      },
      {
        key: '39',
        channel: '39',
        frequency: '478.1',
        status: true,
      },
    ];

    const dataSource6 =[
      {
        key: '40',
        channel: '40',
        frequency: '478.3',
        status: true,
      },
      {
        key: '41',
        channel: '41',
        frequency: '478.5',
        status: true,
      },
      {
        key: '42',
        channel: '42',
        frequency: '478.7',
        status: true,
      },
      {
        key: '43',
        channel: '43',
        frequency: '478.9',
        status: true,
      },
      {
        key: '44',
        channel: '44',
        frequency: '479.1',
        status: true,
      },
      {
        key: '45',
        channel: '45',
        frequency: '479.3',
        status: true,
      },
      {
        key: '46',
        channel: '46',
        frequency: '479.5',
        status: true,
      },
      {
        key: '47',
        channel: '47',
        frequency: '479.7',
        status: true,
      },
    ];

    const dataSource7 =[
      {
        key: '48',
        channel: '48',
        frequency: '479.9',
        status: true,
      },
      {
        key: '49',
        channel: '49',
        frequency: '480.1',
        status: true,
      },
      {
        key: '50',
        channel: '50',
        frequency: '480.3',
        status: true,
      },
      {
        key: '51',
        channel: '51',
        frequency: '480.5',
        status: true,
      },
      {
        key: '52',
        channel: '52',
        frequency: '480.7',
        status: true,
      },
      {
        key: '53',
        channel: '53',
        frequency: '480.9',
        status: true,
      },
      {
        key: '54',
        channel: '54',
        frequency: '481.1',
        status: true,
      },
      {
        key: '55',
        channel: '55',
        frequency: '481.3',
        status: true,
      },
    ];

    const dataSource8 =[
      {
        key: '56',
        channel: '56',
        frequency: '481.5',
        status: true,
      },
      {
        key: '57',
        channel: '57',
        frequency: '481.7',
        status: true,
      },
      {
        key: '58',
        channel: '58',
        frequency: '481.9',
        status: true,
      },
      {
        key: '59',
        channel: '59',
        frequency: '482.1',
        status: true,
      },
      {
        key: '60',
        channel: '60',
        frequency: '482.3',
        status: true,
      },
      {
        key: '61',
        channel: '61',
        frequency: '482.5',
        status: true,
      },
      {
        key: '62',
        channel: '62',
        frequency: '482.7',
        status: true,
      },
      {
        key: '63',
        channel: '63',
        frequency: '482.9',
        status: true,
      },
    ];

    const dataSource9 =[
      {
        key: '64',
        channel: '64',
        frequency: '483.1',
        status: true,
      },
      {
        key: '65',
        channel: '65',
        frequency: '483.3',
        status: true,
      },
      {
        key: '66',
        channel: '66',
        frequency: '483.5',
        status: true,
      },
      {
        key: '67',
        channel: '67',
        frequency: '483.7',
        status: true,
      },
      {
        key: '68',
        channel: '68',
        frequency: '483.9',
        status: true,
      },
      {
        key: '69',
        channel: '69',
        frequency: '484.1',
        status: true,
      },
      {
        key: '70',
        channel: '70',
        frequency: '484.3',
        status: true,
      },
      {
        key: '71',
        channel: '71',
        frequency: '484.5',
        status: true,
      },
    ];

    const dataSource10 =[
      {
        key: '72',
        channel: '72',
        frequency: '484.7',
        status: true,
      },
      {
        key: '73',
        channel: '73',
        frequency: '484.9',
        status: true,
      },
      {
        key: '74',
        channel: '74',
        frequency: '485.1',
        status: true,
      },
      {
        key: '75',
        channel: '75',
        frequency: '485.3',
        status: true,
      },
      {
        key: '76',
        channel: '76',
        frequency: '485.5',
        status: true,
      },
      {
        key: '77',
        channel: '77',
        frequency: '485.7',
        status: true,
      },
      {
        key: '78',
        channel: '78',
        frequency: '485.9',
        status: true,
      },
      {
        key: '79',
        channel: '79',
        frequency: '486.1',
        status: true,
      },
    ];

    const dataSource11 =[
      {
        key: '80',
        channel: '80',
        frequency: '486.3',
        status: true,
      },
      {
        key: '81',
        channel: '81',
        frequency: '486.5',
        status: true,
      },
      {
        key: '82',
        channel: '82',
        frequency: '486.7',
        status: true,
      },
      {
        key: '83',
        channel: '83',
        frequency: '486.9',
        status: true,
      },
      {
        key: '84',
        channel: '84',
        frequency: '487.1',
        status: true,
      },
      {
        key: '85',
        channel: '85',
        frequency: '487.3',
        status: true,
      },
      {
        key: '86',
        channel: '86',
        frequency: '487.5',
        status: true,
      },
      {
        key: '87',
        channel: '87',
        frequency: '487.7',
        status: true,
      },
    ];

    const dataSource12 =[
      {
        key: '88',
        channel: '88',
        frequency: '487.9',
        status: true,
      },
      {
        key: '89',
        channel: '89',
        frequency: '488.1',
        status: true,
      },
      {
        key: '90',
        channel: '90',
        frequency: '488.3',
        status: true,
      },
      {
        key: '91',
        channel: '91',
        frequency: '488.5',
        status: true,
      },
      {
        key: '92',
        channel: '92',
        frequency: '488.7',
        status: true,
      },
      {
        key: '93',
        channel: '93',
        frequency: '488.9',
        status: true,
      },
      {
        key: '94',
        channel: '94',
        frequency: '489.1',
        status: true,
      },
      {
        key: '95',
        channel: '95',
        frequency: '489.3',
        status: true,
      },
    ];

    return (
      <div className={styles.tabContainer}>
        <Tabs type="card">
          <TabPane tab="终端基本配置" key="1">
            <Form {...formItemLayout}>
              <Form.Item label="入网模式">
                <Select defaultValue="otta">
                  <Option value="otta">动态加入(OTTA)</Option>
                  <Option value="abp">静态配置(ABP)</Option>
                </Select>
              </Form.Item>
              <Form.Item label="应用密钥(AppKey)">
                {getFieldDecorator('key', {
                  rules: [
                    {
                      required: true,
                      message: '应用密钥(AppKey)不能为空'
                    },
                  ],
                })(<Input placeholder="请输入应用密钥(AppKey)" />)}
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="终端高级配置" key="2">
            <Form>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="终端模式" labelCol={{ span: 12}} wrapperCol={{ span: 12 }}>
                    <Select defaultValue="A">
                      <Option value="A">A</Option>
                      <Option value="C">C</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="ADR开关" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                    <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked={false} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="发送报文副本数" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                    {getFieldDecorator('packet', {
                      rules: [
                        {
                          required: true,
                          message: '不能为空'
                        },
                      ],
                      initialValue: 1,
                    })(<InputNumber min={1} max={3} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={8}>
                  <Form.Item label="链路保活报文类型" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                    <Select defaultValue="unconfirmed">
                      <Option value="unconfirmed">非确认报文</Option>
                      <Option value="confirmed">确认报文</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Form.Item label="链路保活周期" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
                    {getFieldDecorator('heartbeat', {
                      rules: [
                        {
                          required: true,
                          message: '最小值为60秒'
                        }
                      ],
                    })(<div className="time"><InputNumber min={0} max={30} className={styles.timeset} value={1} /> 天 <InputNumber min={0} max={23} className={styles.timeset} value={0} /> 时 <InputNumber min={0} max={59} className={styles.timeset} value={0} /> 分 <InputNumber min={0} max={59} className={styles.timeset} value={0} /> 秒</div>)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane tab="射频基本配置" key="3">
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="工作频段" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  <Select defaultValue="CN470">
                    <Option value="CN470">CN470</Option>
                    <Option value="EU433">EU433</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="发送速率DR" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  <InputNumber min={0} max={5} defaultValue={0} />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="发送功率" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  <Select defaultValue="17">
                    <Option value="17">17</Option>
                    <Option value="15">15</Option>
                    <Option value="13">13</Option>
                    <Option value="11">11</Option>
                    <Option value="9">9</Option>
                    <Option value="6">6</Option>
                    <Option value="4">4</Option>
                    <Option value="2">2</Option>
                  </Select>
                  <span> dBm</span>
                </Form.Item>
              </Col>
            </Row>
            <Tabs type="card">
              <TabPane tab="信道组1" key="signal1">
                <Table columns={columns} dataSource={dataSource1} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组2" key="signal2">
                <Table columns={columns} dataSource={dataSource2} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组3" key="signal3">
                <Table columns={columns} dataSource={dataSource3} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组4" key="signal4">
                <Table columns={columns} dataSource={dataSource4} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组5" key="signal5">
                <Table columns={columns} dataSource={dataSource5} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组6" key="signal6">
                <Table columns={columns} dataSource={dataSource6} pagination={false} size="small" bordered={true} />  
              </TabPane>
              <TabPane tab="信道组7" key="signal7">
                <Table columns={columns} dataSource={dataSource7} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组8" key="signal8">
                <Table columns={columns} dataSource={dataSource8} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组9" key="signal9">
                <Table columns={columns} dataSource={dataSource9} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组10" key="signal10">
                <Table columns={columns} dataSource={dataSource10} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组11" key="signal11">
                <Table columns={columns} dataSource={dataSource11} pagination={false} size="small" bordered={true} />
              </TabPane>
              <TabPane tab="信道组12" key="signal12">
                <Table columns={columns} dataSource={dataSource12} pagination={false} size="small" bordered={true} />
              </TabPane>
            </Tabs>
          </TabPane>
          <TabPane tab="接收窗口配置" key="4">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="RX1速率偏移" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  <InputNumber min={0} max={3} defaultValue={0} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="RX1延迟时间" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  <InputNumber min={5} max={15} defaultValue={5} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="RX2速率DR" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  <InputNumber min={0} max={5} defaultValue={0} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="RX2频率" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }}>
                  <InputNumber min={500.3} max={509.7} defaultValue={505.3} step={0.2} />
                </Form.Item>
              </Col>
            </Row>
          </TabPane>
          <TabPane tab="虚拟网络配置" key="5">
            <Form.Item label="虚拟网络ID" labelCol={{ span: 8 }} wrapperCol={{ span: 8 }}>
              <Select showSearch style={{ width: '100%'}} placeholder="请选择要绑定的虚拟网络ID">
                <Option value="none">无可选项</Option>
              </Select>
            </Form.Item>
          </TabPane>
        </Tabs>
      </div>
    );
  }

  handleMapSelect = () => {
    this.setState({
      mapVisible: true,
    });
  }

  handleMapOk = () => {
    this.setState({
      mapVisible: false,
    });
  }

  handleMapCancel = () => {
    this.setState({
      mapVisible: false,
    });
  }

  poiPickerReady = (poiPicker: any) => {
    poiPicker.on('poiPicked', (poiResult: any) => {
      const poi = poiResult.item;
      console.log('poi: ', poi);
      const markerInfo: [number, number] = [poi.location.lng, poi.location.lat];
      console.log('markerInfo: ', markerInfo);
      const markerName = poi.name;
      const markerPos = poi.location.toString();
      /*
      const info = {
        source: source,
        id: poi.id,
        name: poi.name,
        location: poi.location.toString(),
        address: poi.address
      };
      */

      this.setState({
        markerInfo,
        markerName,
        markerPos,
      });
    });
  }

  initChooseAddress  = () => {
    console.log('AMapUI loaded Done');
    window.AMapUI.loadUI(['misc/PoiPicker'], (PoiPicker: any) => {
      let poiPicker = new PoiPicker({
        input: 'pickerInput'
      });

      this.poiPickerReady(poiPicker);
    });
  }

  render() {
    const { addSingleTermialCurrent } = this.state;
    const { backTermial } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        md: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        md: { span: 12 },
      },
    };

    const steps = [
      {
        title: '基本参数',
        content: this.renderBasicParameters(),
      },
      {
        title: 'LoRa参数',
        content: this.renderLoRaParameters(),
      },
    ];

    const events = {
      click: (e: any) => {
        console.log('e: ', e);
        const markerInfo: [number, number] = [e.lnglat.lng, e.lnglat.lat];
        const markerPos = e.lnglat.toString();
        let markerName = '未知地点';
        AMap.plugin('AMap.Geocoder', () => {
          const geocoder = new AMap.Geocoder({
            city: "010"
          });
          geocoder && geocoder.getAddress(e.lnglat, (status: any, result: any) => {
            if (status === 'complete') {
              if (result.regeocode) {
                markerName = result.regeocode.formattedAddress || '未知地点';

                this.setState({
                  markerInfo,
                  markerName,
                  markerPos,
                });
              } 
            }
          });
        });
      }
    };

    return (
      <div className={styles.termialSteps}>
        <Steps current={addSingleTermialCurrent}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[addSingleTermialCurrent].content}</div>
        <div className={styles.stepsAction}>
          {addSingleTermialCurrent === 0 && (
            <Button type="primary" className={styles.stepsBtn} onClick={backTermial}>返回终端列表</Button>
          )}
          {addSingleTermialCurrent < steps.length - 1 && (
            <Button type="primary" className={styles.stepsBtn} onClick={() => this.next()}>下一步</Button>
          )}
          {addSingleTermialCurrent === steps.length - 1 && (
            <Button type="primary" onClick={this.handleComplete}>完成</Button>
          )}
          {addSingleTermialCurrent > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>上一步</Button>
          )}
        </div>
        <Modal 
          title="请在地图上选择终端部署的地理位置"
          visible={this.state.mapVisible}
          onOk={this.handleMapOk}
          onCancel={this.handleMapCancel}
        >
          <Input id="pickerInput" placeholder="请输入要搜索的地址" className={styles.mapInput} />
          <div className={styles.mapContainer}>
            <Map amapkey="d7c0e0b00b1dbf0eaeddf71cdc5c62e1" plugins={['Scale', 'ToolBar']} useAMapUI={this.initChooseAddress} events={events}> 
              <Marker position={this.state.markerInfo} />
            </Map>
          </div>
          <div className={styles.mapFooter}>
            <Form {...formItemLayout}>
              <Form.Item label="地理位置" style={{marginBottom: 0}}>
                <Input placeholder="点击地图获取地理位置" value={this.state.markerName} disabled />
              </Form.Item>
              <Form.Item label="地理坐标">
                <Input placeholder="点击地图获取地理坐标" value={this.state.markerPos} disabled />
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Form.create<AddSingleTermialProps>()(AddSingleTermial);
