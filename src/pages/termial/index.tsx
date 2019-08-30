import React, { Component, Suspense } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import { connect } from 'dva';

import PageLoading from '../../components/PageLoading';

const DeviceRow = React.lazy(() => import('./DeviceRow'));
const DeviceTab = React.lazy(() => import('./DeviceTab'));

interface DashboardProps {
  loading: boolean;
}

interface DashboardState {
}

@connect(({ loading }: { loading: { effects: { [key: string] : boolean }; }; }) => ({
  loading: loading.effects['dashboard/fetch'],
}))
class Dashboard extends Component<DashboardProps, DashboardState> {
  render() {
    const { loading } = this.props;
    console.log('loading: ', loading);

    return (
      <GridContent>
        <React.Fragment>
          <Suspense fallback={<PageLoading />}>
            <DeviceRow loading={loading} />
            <DeviceTab />
          </Suspense>
        </React.Fragment>
      </GridContent>
    );
  }
}

export default Dashboard;