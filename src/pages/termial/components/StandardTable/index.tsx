import React, { Component, Fragment } from 'react';
import { Alert, Table } from 'antd';
import { ColumnProps, TableRowSelection, TableProps } from 'antd/es/table';

import { TableTermialItem } from '../../data.d';
import styles from './index.less';

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface StandardTableProps<T> extends Omit<TableProps<T>, 'columns'> {
  columns: StandardTableColumnProps[];
  data: {
    list: TableTermialItem[];
    pagination: StandardTableProps<TableTermialItem>['pagination'];
  };
  selectedRows: TableTermialItem[];
  onSelectRow: (rows: any) => void;
}
 
export interface StandardTableColumnProps extends ColumnProps<TableTermialItem> {
  needTotal?: boolean;
  total?: number;
}

interface StandardTableState {
  selectedRowKeys: string[];
  needTotalList: StandardTableColumnProps[];
}

function initTotalList(columns: StandardTableColumnProps[]) {
  if (!columns) {
    return [];
  }
  const totalList: StandardTableColumnProps[] = [];
  columns.forEach(column => {
    if (column.needTotal) {
      totalList.push({ ...column, total: 0 });
    }
  });
  return totalList;
}

class StandardTable extends Component<StandardTableProps<TableTermialItem>, StandardTableState> {
  constructor(props: StandardTableProps<TableTermialItem>) {
    super(props);
    const { columns } = props;
    const needTotalList = initTotalList(columns);

    this.state = {
      selectedRowKeys: [],
      needTotalList,
    };
  }

  handleRowSelectChange: TableRowSelection<TableTermialItem>['onChange'] = (
    selectedRowKeys,
    selectedRows: TableTermialItem[],
  ) => {
    const currySelectedRowKeys = selectedRowKeys as string[];
    let { needTotalList } = this.state;
    needTotalList = needTotalList.map(item => ({
      ...item,
      total: selectedRows.reduce((sum, val) => sum + parseFloat(val[item.dataIndex || 0]), 0),
    }));
    const { onSelectRow } = this.props;
    if (onSelectRow) {
      onSelectRow(selectedRows);
    }
    this.setState({ selectedRowKeys: currySelectedRowKeys, needTotalList });
  }

  handleTableChange: TableProps<TableTermialItem>['onChange'] = (
    pagination,
    filters,
    sorter,
    ...rest
  ) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(pagination, filters, sorter, ...rest);
    }
  }

  render() {
    const { selectedRowKeys, needTotalList } = this.state;
    const { data, rowKey, ...rest } = this.props;
    const { list = [], pagination = false } = data || {};

    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      ...pagination,
    }

    const rowSelection: TableRowSelection<TableTermialItem> = {
      selectedRowKeys,
      onChange: this.handleRowSelectChange,
      getCheckboxProps: (record: TableTermialItem) => ({
        disabled: record.disabled,
      })
    }

    return (
      <div className={styles.standardTable}>
        <Table
          rowKey={rowKey || 'key'}
          rowSelection={rowSelection}
          dataSource={list}
          pagination={paginationProps}
          onChange={this.handleTableChange}
          {...rest}
        />
      </div>
    );
  }
}

export default StandardTable;