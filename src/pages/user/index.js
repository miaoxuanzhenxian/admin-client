import React, { Component } from 'react';
import { Card, Button, Table, message } from 'antd';

import LinkButton from '@/components/link-button';
import { reqUsers } from '@/api';
import { formatDate } from '@/utils/dateUtils';

export default class User extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      users: [], // 所有用户列表
    }

    this.initColumns()
  }

  initColumns = () => {
    this.columns = [
      {
        title: '用户名',
        dataIndex: 'username'
      },
      {
        title: '邮箱',
        dataIndex: 'email'
      },
      {
        title: '电话',
        dataIndex: 'phone'
      },
      {
        title: '注册时间',
        dataIndex: 'create_time',
        render: formatDate
      },
      {
        title: '所属角色',
        dataIndex: 'role_id',
        // render: (role_id) => this.state.roles.find(role => role._id === role_id).name // 每一行的角色名都要遍历一次，效率低，因此不用这种方式，而是改用生成一个对象容器(属性名: 角色的ID值, 属性值是角色的名称)，用该对象直接调用角色的ID值属性即可得到角色名，该方式总共只遍历了一次，每一行的角色名直接通过对象调用即可得到，大大提高了效率。
        render: (role_id) => this.roleNamesObj[role_id] // 改用生成一个对象容器(属性名: 角色的ID值, 属性值是角色的名称)，用该对象直接调用角色的ID值属性即可得到角色名，该方式总共只遍历了一次，每一行的角色名直接通过对象调用即可得到，大大提高了效率。
      },
      {
        title: '操作',
        render: () => (
          <span>
            <LinkButton>修改</LinkButton>
            <LinkButton>删除</LinkButton>
          </span>
        )
      },
    ]
  }

  /*
    异步获取所有用户列表显示
  */
  getUsers = async () => {
    this.setState({ loading: true })
    const result = await reqUsers()
    if (result.status === 0) {
      const { users, roles } = result.data

      // 生成一个对象容器(属性名: 角色的ID值, 属性值是角色的名称)
      this.roleNamesObj = roles.reduce((pre, role) => {
        pre[role._id] = role.name
        return pre
      }, {})

      this.setState({
        users,
        loading: false
      })
    } else {
      message.error('获取用户列表失败')
      this.setState({ loading: false })
    }
  }

  componentDidMount() {
    this.getUsers() // 异步获取所有用户列表显示
  }

  render() {

    const { loading, users } = this.state

    const title = (
      <Button type="primary">创建用户</Button>
    )

    return (
      <div>
        <Card title={title}>
          <Table
            bordered
            loading={loading}
            columns={this.columns}
            dataSource={users}
            rowKey="_id"
            pagination={{
              defaultPageSize: 2,
              showQuickJumper: true
            }}
          />
        </Card>
      </div>
    )
  }
}
