import React, { Component, Suspense } from 'react';
import { Card, Tabs } from 'antd';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';
import { Dispatch } from 'redux';
import bcrypt from 'bcryptjs';
import Iframe from 'react-iframe';

import PageLoading from '../../components/PageLoading';
import TermialList from './components/TermialList';
import styles from './style.less';
import { StateType } from './model';

const DeviceRow = React.lazy(() => import('./DeviceRow'));

const { TabPane } = Tabs;

interface TermialProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  termial: StateType;
}

interface TermialState {
}

@connect(
  ({ 
    termial,
    loading, 
  }: { 
    termial: StateType;
    loading: { 
      models: { 
        [key: string] : boolean; 
      }; 
    }; 
  }) => ({
    termial,  
    loading: loading.models.rule,
  })
)
class Termial extends Component<TermialProps, TermialState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'termial/fetch'
    });
  }

  handleTabClick = (e: any) => {
    console.log(e);
  }

  generateUrl = () => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const token = 'TXvVHtMR';
    const midToken = bcrypt.hashSync(token, salt);
    const midTokenBuf = new Buffer(midToken);
    const hashToken = midTokenBuf.toString('base64');
    const url = 'https://gis.aliyun-iot-share.com/auth/gis/' + hashToken + '/b770adc9293d4dcbaa9431dfebe0a1c1';
    return url;
  }

  render() {
    const { termial, loading, dispatch } = this.props;
    console.log('loading: ', loading);

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <DeviceRow loading={loading} />
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
              <div className={styles.deviceTab}>
                <Tabs defaultActiveKey="1" onChange={this.handleTabClick}>
                  <TabPane tab="设备地图" key="1">
                    <Iframe url={this.generateUrl()}
                      width="100%"
                      height="500px"
                    />
                  </TabPane>
                  <TabPane tab="设备列表" key="2">
                    <TermialList loading={loading} termialList={termial} dispatch={dispatch}/>
                  </TabPane>
                </Tabs>
              </div>
            </Card>
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Termial;