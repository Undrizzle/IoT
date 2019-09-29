import React, { Component, Fragment } from 'react';
import { Badge, Button, Card, Col, Divider, Form, Input, Row, Select } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import { SorterResult } from 'antd/es/table';
import { Dispatch } from 'redux';

import styles from './index.less';
import StandardTable, { StandardTableColumnProps } from '../StandardTable';
import AddSingleTermial from '../../../../components/AddSingleTermial';
import { StateType } from '../../model';
import { TableTermialItem, TableTermialPagination, TableTermialParams } from '../../data.d';
import { string } from 'prop-types';

const FormItem = Form.Item;
const { Option } = Select;
const { Search } = Input;
const getValue = (obj: { [x: string]: string[] }) =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

type IStatusMapType = 'default' | 'processing' | 'error';
const statusMap = ['default', 'processing', 'error'];
const status = ['离线', '在线', '异常'];

interface TermialListProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loading: boolean;
  termialList: StateType;
}

interface TermialListState {
  selectedRows: TableTermialItem[];
  formValues: { [kay: string]: string };
  showType: number;
}

class TermialList extends Component<TermialListProps, TermialListState> {
  state: TermialListState = {
    selectedRows: [],
    formValues: {},
    showType: 0,
  };

  columns: StandardTableColumnProps[] = [
    {
      title: '终端名称',
      dataIndex: 'name',
    },
    {
      title: '终端标识内容',
      dataIndex: 'eui',
    },
    {
      title: '终端型号',
      dataIndex: 'model',
    },
    {
      title: '场所名称',
      dataIndex: 'place',
    },
    {
      title: '接入方式',
      dataIndex: 'access',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: '0',
        },
        {
          text: status[1],
          value: '1',
        },
        {
          text: status[2],
          value: '2',
        },
      ],
      render(val: IStatusMapType) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a>配置</a>
          <Divider type="vertical" />
          <a>删除</a>
          <Divider type="vertical" />
          <a>重启</a>
        </Fragment>
      ),
    },
  ];

  handleSelectRows = (rows: TableTermialItem[]) => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleStandardTableChange = (
    pagination: Partial<TableTermialPagination>,
    filtersArg: Record<keyof TableTermialItem, string[]>,
    sorter: SorterResult<TableTermialItem>,
  ) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params: Partial<TableTermialParams> = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'termial/fetch',
      payload: params,
    });
  };

  handleSearch = (e: any) => {
    e.preventDefault();
    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {}
      values[fieldsValue.prefix] = fieldsValue.content;

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'termial/fetch',
        payload: values,
      });
    });
  };

  handleRemove = () => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;
    dispatch({
      type: 'termial/remove',
      payload: {
        key: selectedRows.map(row => row.key),
      },
      callback: () => {
        this.setState({
          selectedRows: [],
        });
      },
    });
  };

  handleAddSingle = () => {
    this.setState({
      showType: 1,
    });
  }

  handleBackTermial = () => {
    this.setState({
      showType: 0,
    });
  }

  renderSimpleForm() {
    const { form } = this.props;
    const { selectedRows } = this.state;
    const { getFieldDecorator } = form;
    const selectBefore = getFieldDecorator('prefix', {
      initialValue: 'name',
    })(
      <Select style={{ width: 120 }}>
        <Option value="name">终端名称</Option>
        <Option value="eui">终端标识内容</Option>
        <Option value="model">终端型号</Option>
        <Option value="place">场所名称</Option>
        <Option value="access">接入方式</Option>
      </Select>
    );

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col lg={8} md={12} sm={24}>
            <FormItem>
              {getFieldDecorator('content')(
                <Search addonBefore={selectBefore} placeholder="请输入要搜索的内容" onSearch={(value, e) => this.handleSearch(e)} />
              )}
            </FormItem>
          </Col>
          <Col lg={{ span: 8, offset: 8 }} md={12} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" icon="delete" disabled={!(selectedRows.length > 0)} onClick={this.handleRemove}>
                批量删除
              </Button>
              <Button style={{ marginLeft: 8 }} type="primary" icon="plus">
                批量添加
              </Button>
              <Button style={{ marginLeft: 8 }} type="primary" icon="plus" onClick={this.handleAddSingle}>
                添加终端
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const { termialList: { data }, loading } = this.props;
    const { selectedRows, showType } = this.state;

    console.log('showType: ', showType);

    switch (showType) {
      case 0:
        return (
          <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderSimpleForm()}</div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        );
      case 1:
        return (
          <Card bordered={false}>
            <AddSingleTermial backTermial={this.handleBackTermial} />
          </Card>
        );
      default:
        return null;
    }
  }
}

export default Form.create<TermialListProps>()(TermialList);