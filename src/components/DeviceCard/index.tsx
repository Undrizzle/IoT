import React, { ReactNode } from 'react';
import { Card } from 'antd';
import { CardProps } from 'antd/lib/card';

import styles from './index.less';

export interface IChartCardProps extends CardProps {
  title: string;
  sub1: string;
  sub2: string;
  sub3: string;
  icon: ReactNode;
  total: number;
  fault: number;
  offline: number;
}

class DeviceCard extends React.Component<IChartCardProps> {
  renderContent = () => {
    const { title, sub1, sub2, sub3, icon, total, fault, offline, loading } = this.props;
    if (loading) {
      return false;
    }
    return (
      <div className={styles.deviceCard}>
        <div className={styles.cardTop}>
          <div className={styles.cardIcon}>{icon}</div>
          <div className={styles.cardIcon}><span>{title}</span></div>
          <div className={styles.cardIcon}><span className={styles.total}>{sub1}</span><span className={styles.cardTotal}>{total}</span></div>
          <div className={styles.cardIcon}><span className={styles.total}>{sub2}</span><span className={styles.cardFault}>{fault}</span><span className={styles.cardDivier}>|</span><span className={styles.total}>{sub3}</span><span className={styles.cardOffline}>{offline}</span></div>
        </div>
      </div>
    );
  };

  render() {
    const {
      loading = false,
      icon,
      title,
      sub1,
      sub2,
      sub3,
      total,
      fault,
      offline,
      ...rest
    } = this.props;
    return (
      <Card loading={loading} bodyStyle={{ padding: '5px 10px' }} {...rest}>
        {this.renderContent()}
      </Card>
    );
  }
}

export default DeviceCard;

