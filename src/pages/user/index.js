import React, { Component } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'

import LinkButton from '@/components/link-button'
import { reqUsers, reqAddOrUpdateUser, reqDeleteUser } from '@/api'
import { formatDate } from '@/utils/dateUtils'
import UserForm from './user-form'

/*
  用户管理
*/
export default class User extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      users: [], // 所有用户列表
      roles: [], // 所有角色列表
      isShow: false, // 是否显示确认框
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
        render: (user) => (
          <span>
            <LinkButton onClick={this.showUpdate.bind(this, user)}>
              修改
            </LinkButton>
            <LinkButton onClick={this.deleteUser.bind(this, user)}>
              删除
            </LinkButton>
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
        roles,
        loading: false
      })
    } else {
      message.error('获取用户列表失败')
      this.setState({ loading: false })
    }
  }

  /*
    显示添加界面
  */
  showAdd = () => {
    this.user = null
    this.setState({ isShow: true })
  }

  /*
    显示修改界面
  */
  showUpdate = (user) => {
    this.user = user // 保存user
    this.setState({ isShow: true })
  }

  /*
    取消显示界面
  */
  handleCancel = () => {
    this.setState({ isShow: false })
    this.form.resetFields() // 重置一组输入表单控件的值,即重置输入数据(变成了初始值),重置为initialVale的值,相当于没有输入，即相当于没有在表单框中输入过数据
  }

  /*
    添加或修改(更新)用户
  */
  addOrUpdateUser = () => {
    this.form.validateFields(async (err, values) => {
      if (!err) {
        let action = '添加'
        if (this.user) {
          values._id = this.user._id
          action = '修改'
        }
        const result = await reqAddOrUpdateUser(values)
        if (result.status === 0) {
          message.success(action + '用户成功')
          this.setState({ isShow: false })
          this.form.resetFields()
          this.getUsers()
        } else if (result.status === 1) {
          message.error(result.msg)
          this.getUsers()
        } else {
          message.error(action + '用户失败')
        }
      }
    })
  }

  /*
    删除指定用户
  */
  deleteUser = (user) => {
    Modal.confirm({
      title: `确认删除${user.username}吗?`,
      onOk: async () => {
        const result = await reqDeleteUser(user._id)
        if (result.status === 0) {
          message.success('删除用户成功')
          this.getUsers()
        } else {
          message.error('删除用户失败')
        }
      }
    })
  }

  componentDidMount() {
    this.getUsers() // 异步获取所有用户列表显示
  }

  componentWillUnmount() {
    this.setState = () => { }
  }

  render() {

    const { loading, users, roles, isShow } = this.state

    const user = this.user || {}

    const title = (
      <Button type="primary" onClick={this.showAdd}>
        创建用户
      </Button>
    )

    return (
      <Card title={title}>
        <Table
          bordered
          loading={loading}
          columns={this.columns}
          dataSource={users}
          rowKey="_id"
          pagination={{
            defaultPageSize: 6,
            showQuickJumper: true
          }}
        />

        <Modal
          title={user._id ? '修改用户' : "添加用户"}
          visible={isShow}
          onCancel={this.handleCancel}
          onOk={this.addOrUpdateUser}
        >
          <UserForm
            user={user}
            roles={roles}
            setForm={form => this.form = form}
          />
        </Modal>
      </Card>
    )
  }
}
