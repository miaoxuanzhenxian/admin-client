import React, { Component } from 'react';
import { Card, Button, Icon, Table } from 'antd';
import LinkButton from '@/components/link-button';

import style from './index.module.less';

const columns = [
  {
    title: '分类名称',
    dataIndex: 'name',
  },
  {
    title: '操作',
    width: '300px',
    render: () => <LinkButton>修改分类</LinkButton>
  },
];

const data = [
  {
    "_id": "5e11d7b560f14026000f01f1",
    "name": "aa",
    "__v": 0
  },
  {
    "_id": "5e11d7bb60f14026000f01f2",
    "name": "bb",
    "__v": 0
  },
  {
    "_id": "5e11d7be60f14026000f01f3",
    "name": "cc",
    "__v": 0
  },
  {
    "_id": "5e11d7c260f14026000f01f4",
    "name": "dd",
    "__v": 0
  },
  {
    "_id": "5e11d7c660f14026000f01f5",
    "name": "ee",
    "__v": 0
  },
  {
    "_id": "5e11d7cc60f14026000f01f6",
    "name": "ff",
    "__v": 0
  },
  {
    "_id": "5e11d7d860f14026000f01f7",
    "name": "gg",
    "__v": 0
  },
];

export default class Category extends Component {
  render() {
    //Card右上角的结构
    const extra = (
      <Button type="primary">
        <Icon type="plus" />
        添加
      </Button>
    );
    return (
      <div>
        <Card extra={extra}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="_id"
            bordered
            pagination={{ defaultPageSize: 3, showQuickJumper: true }}
          />
        </Card>
      </div>
    )
  }
}
