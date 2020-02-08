import React, { Component } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';

import { formatDate } from '@/utils/dateUtils';
import LinkButton from '@/components/link-button';
import { reqRoles, reqAddRole, reqUpdateRole } from '@/api';
import AddForm from './add-form'
import AuthForm from './auth_form'
import memoryUtils from '@/utils/memoryUtils'

export default class Role extends Component {
  constructor(props) {
    super(props)

    this.state = {
      roles: [], // 所有角色的列表
      isShowAdd: false, // 是否显示添加界面
      isShowAuth: false, // 是否显示设置权限界面
    }

    this.initColumns() // 初始化table列数组

    this.authRef = React.createRef() // AuthForm组件标签的容器对象
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
        render: (role) => <LinkButton onClick={() => this.showAuth(role)}>设置权限</LinkButton>
      },
    ]
  }

  /*
    显示权限设置列表
  */
  showAuth = (role) => {
    // 将当前需要设置的角色保存到组件对象上
    this.role = role
    this.setState({ isShowAuth: true })
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

  /*
    添加角色
  */
  addRole = () => {
    // 进行表单统一验证, 只能通过了才向下处理
    this.form.validateFields(async (err, values) => {
      if (!err) {
        const result = await reqAddRole(values.roleName)

        // 隐藏弹框
        this.setState({ isShowAdd: false })

        this.form.resetFields() // 重置一组输入表单控件的值,即重置输入数据(变成了初始值),重置为initialVale的值,相当于没有输入，即相当于没有在表单框中输入过数据

        if (result.status === 0) {
          message.success('添加角色成功')
          this.getRoles()
        } else if (result.status === 1) {
          message.info(result.msg)
          this.getRoles()
        } else {
          message.error('添加角色失败')
        }
      }
    })
  }

  /*
    给角色授权，更新角色(给角色设置权限)
  */
  updateRole = async () => {
    const role = this.role
    // 更新role对象相关属性
    role.menus = this.authRef.current.getMenus()
    role.auth_time = Date.now()
    role.auth_name = memoryUtils.user.username

    // 请求更新角色
    const result = await reqUpdateRole(role)

    this.setState({ isShowAuth: false })

    if (result.status === 0) {
      message.success('角色授权成功')
      this.getRoles()
    } else {
      message.error('角色授权失败')
    }
  }

  componentDidMount() {
    this.getRoles() // 异步获取获取角色列表显示
  }

  render() {
    // 取出状态数据
    const { roles, loading, isShowAdd, isShowAuth } = this.state

    const role = this.role || {}

    const title = (
      <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>
        创建角色
      </Button>
    )

    return (
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

        <Modal
          title='添加角色'
          visible={isShowAdd}
          onOk={this.addRole}
          onCancel={() => {
            this.setState({ isShowAdd: false })
            this.form.resetFields() // 重置一组输入表单控件的值,即重置输入数据(变成了初始值),重置为initialVale的值,相当于没有输入，即相当于没有在表单框中输入过数据
          }}
        >
          <AddForm setForm={form => this.form = form} />
        </Modal>

        <Modal
          title="设置角色权限"
          visible={isShowAuth}
          onOk={this.updateRole}
          onCancel={() => {
            this.setState({ isShowAuth: false })
          }}
        >
          {/* 为了在 prop 更改时“重置”某些 state，建议使用 key 使组件完全不受控代替componentWillReceiveProps()生命周期函数，因为此生命周期函数即将过时，因此做法如下：组件接收到新的标签属性时,即接收到的不同role._id的role对象时，即当 key的值 变化时， React 会创建一个新的而不是更新一个既有的组件。每次 key的值role._id 更改，都会重新创建 AuthForm组件 ，并将其状态重置为最新的 role的 值。每次 key的值 变化，表单里的所有组件都会用新的初始值重新创建。大部分情况下，这是处理 prop 更改时重置 state 的最好的办法。这听起来很慢，但是这点的性能是可以忽略的。如果在组件树的更新上有很重的逻辑，这样反而会更快，因为省略了子组件 diff。*/}
          <AuthForm ref={this.authRef} role={role} />
        </Modal>
      </Card>
    )
  }
}
