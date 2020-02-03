import React, { Component } from 'react';
import { Card, Button, Table, message } from 'antd';

import { formatDate } from '@/utils/dateUtils';
import LinkButton from '@/components/link-button';
import { reqRoles } from '@/api';

export default class Role extends Component {
  constructor(props) {
    super(props)

    this.state = {
      roles: [], // 所有角色的列表
    }

    this.initColumns() // 初始化table列数组
  }

  /* 
    初始化table列数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        // render: create_time => formateDate(create_time)
        render: formatDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render: formatDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
      {
        title: '操作',
        render: () => <LinkButton>设置权限</LinkButton>
      },
    ]
  }

  /*
    异步获取获取角色列表显示
  */
  getRoles = async () => {
    this.setState({ loading: true })
    const result = await reqRoles()
    if (result.status === 0) {
      this.setState({
        loading: false,
        roles: result.data,
      })
    } else {
      message.error('获取角色列表失败')
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    this.getRoles() // 异步获取获取角色列表显示
  }

  render() {
    // 取出状态数据
    const { roles, loading } = this.state

    const title = (
      <Button type="primary">
        创建角色
      </Button>
    )

    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            loading={loading}
            columns={this.columns}
            dataSource={roles}
            rowKey="_id"
            pagination={{
              defaultPageSize: 6,
              showQuickJumper: true
            }}
          />
        </Card>
      </div>
    )
  }
}
