import React, { Component } from 'react';
import { Card, Tabs } from 'antd';

import styles from './style.less';

const { TabPane } = Tabs;

class DeviceTab extends Component {
  handleTabClick = (e: any) => {
    console.log(e);
  }

  render() {
    return (
      <Card bordered={false} bodyStyle={{ padding: 0 }}>
        <div className={styles.deviceTab}>
          <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
            <TabPane tab="设备地图" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="设备列表" key="2">
              Content of Tab Pane 2
            </TabPane>
          </Tabs>
        </div>
      </Card>
    )
  }
}

export default DeviceTab