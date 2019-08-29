import React from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi-plugin-locale';
import numeral from 'numeral';

import DeviceCard from '../../components/DeviceCard';
import Yuan from './Yuan';
import Trend from '../../components/Trend';
import Field from '../../components/Field';
import styles from './style.less';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};

const DeviceRow = ({ loading }: { loading: boolean; }) => (
  <Row gutter={24} type="flex">
    <Col {...topColResponsiveProps}>
      <DeviceCard 
        bordered={false}
        title={
          <FormattedMessage id="device.analysis.total-sales" defaultMessage="Total Sales" />
        }
        action={
          <Tooltip
            title={
              <FormattedMessage id="device.analysis.introduce" defaultMessage="Introduce" />
            }
          >
            <Icon type="info-circle-o" />
          </Tooltip>
        }
        loading={loading}
        total={() => <Yuan>126560</Yuan>}
        footer={
          <Field 
            label={
              <FormattedMessage id="device-analysis.day-sales" defaultMessage="Daily Sales" />
            }
            value={`￥${numeral(12423).format('0,0')}`}
          />
        }
        contentHeight={46}
      >
        <Trend flag="up" style={{ marginRight: 16 }}>
          <FormattedMessage id="device.analysis.week" defaultMessage="Weekly Changes" />
          <span className={styles.trendText}>12%</span>
        </Trend>
        <Trend flag="down">
          <FormattedMessage id="device.analysis.day" defaultMessage="Daily Changes" />
          <span className={styles.trendText}>11%</span>
        </Trend>
      </DeviceCard>
    </Col>
  </Row>
);

export default DeviceRow;