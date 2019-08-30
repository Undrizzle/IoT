import React from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import classNames from 'classnames';

import DeviceCard from '../../components/DeviceCard';

import styles from './style.less';

const topColResponsiveProps = {
  xs: 12,
  sm: 6,
  md: 6,
  lg: 6,
  xl: 3,
  style: { marginBottom: 24 },
};

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1377592_fsx28enoz2s.js',
});

const DeviceArray = [
  {
    type: 'icon-yangan',
    title: '烟感报警器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 20,
    fault: 5,
    offline: 4,
  },
  {
    type: 'icon-wengan',
    title: '温感报警器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 100,
    fault: 10,
    offline: 15,
  },
  {
    type: 'icon-ranqi',
    title: '燃气探测器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 58,
    fault: 16,
    offline: 0,
  },
  {
    type: 'icon-shengguang',
    title: '声光警报器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 141,
    fault: 38,
    offline: 13,
  },
  {
    type: 'icon-dici',
    title: '地磁检测器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 20,
    fault: 1,
    offline: 5,
  },
  {
    type: 'icon-shoudong',
    title: '手动报警器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 18,
    fault: 0,
    offline: 3,
  },
  {
    type: 'icon-menci',
    title: '门磁报警器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 32,
    fault: 2,
    offline: 11,
  },
  {
    type: 'icon-shuiya',
    title: '水压报警器',
    sub1: '总数',
    sub2: '故障',
    sub3: '离线',
    total: 56,
    fault: 4,
    offline: 23,
  }
];

const alarmArray = [
  {
    type: 'icon-huozai',
    title: '火灾报警',
    sub1: '今日(事件)',
    sub2: '本周',
    sub3: '本月',
    total: 20,
    fault: 3,
    offline: 12,
  },
  {
    type: 'icon-zhandao',
    title: '占道报警',
    sub1: '今日(事件)',
    sub2: '本周',
    sub3: '本月',
    total: 50,
    fault: 10,
    offline: 30,
  },
  {
    type: 'icon-guzhang',
    title: '故障报警',
    sub1: '今日(事件)',
    sub2: '本周',
    sub3: '本月',
    total: 130,
    fault: 34,
    offline: 92,
  }
];

const DeviceRow = ({ loading }: { loading: boolean; }) => (
  <Row gutter={24} type="flex">
    {
      DeviceArray.map((item, index) => {
        return (
          <Col {...topColResponsiveProps} key={index}>
            <DeviceCard 
              bordered={false}
              icon={<IconFont type={item.type} style={{ fontSize: '48px', color: 'lightblue' }} />}
              title={item.title}
              sub1={item.sub1}
              sub2={item.sub2}
              sub3={item.sub3}
              total={item.total}
              fault={item.fault}
              offline={item.offline}   
              loading={loading}
            >
            </DeviceCard>
          </Col>
        )
      })
    }
  </Row>
);

export default DeviceRow;