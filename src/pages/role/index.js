import React, { Component } from 'react';
import { Card, Button, Table, message, Modal } from 'antd';

import { formatDate } from '@/utils/dateUtils';
import LinkButton from '@/components/link-button';
import { reqRoles, reqAddRole } from '@/api';
import AddForm from './add-form'

export default class Role extends Component {
  constructor(props) {
    super(props)

    this.state = {
      roles: [], // 所有角色的列表
      isShowAdd: false, // 是否显示添加界面
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

  componentDidMount() {
    this.getRoles() // 异步获取获取角色列表显示
  }

  render() {
    // 取出状态数据
    const { roles, loading, isShowAdd } = this.state

    const title = (
      <Button type="primary" onClick={() => this.setState({ isShowAdd: true })}>
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

          <Modal
            title='添加角色'
            visible={isShowAdd}
            onOk={this.addRole}
            onCancel={() => {
              this.setState({ isShowAdd: false })
              this.form.resetFields() // 重置一组输入表单控件的值,即重置输入数据(变成了初始值),重置为initialVale的值,相当于没有输入，即相当于没有在表单框中输入过数据
            }}
          >
            <AddForm setForm={(form) => this.form = form} />
          </Modal>
        </Card>
      </div>
    )
  }
}
