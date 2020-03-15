import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'
import LinkButton from '@/components/link-button'

import { reqCategorys, reqAddCategory, reqUpdateCategory } from '@/api'
import AddUpdateForm from './add-update-form'

/* 品类管理 */
export default class Category extends Component {
  
  constructor(props) {
    super(props)

    this.state = {
      categorys: [],
      loading: false, // 是否正在请求加载中,初始为关闭状态，不显示loading
      showStatus: 0, // 0: 不显示, 1: 显示添加, 2: 显示修改
    }

    this.initColumns() // 初始化Table的所有列信息的数组
  }

  /*
    初始化Table的所有列信息的数组
  */
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: '300px',
        render: (category) => <LinkButton onClick={() => {
          this.category = category; //保存当前分类，使其它地方都可读取到
          this.setState({ showStatus: 2 })
        }}>修改分类</LinkButton>
      },
    ]
  }

  /*
    异步获取分类列表显示
  */
  getCategorys = async () => {
    //开启loading，显示loading
    this.setState({ loading: true })
    //发异步ajax请求
    const result = await reqCategorys()
    if (result.status === 0) { //成功了
      //取出分类列表
      const categorys = result.data
      //更新状态categorys数据
      this.setState({
        loading: false, //成功了后关闭loading，不显示loading（其实就是删除loading组件）
        categorys,
      });
    } else {
      message.error('获取分类列表失败')
      this.setState({ loading: false }) //获取分类列表失败后关闭loading，不显示loading（其实就是删除loading组件）
    }
  }

  /* 
    点击确定(ok)的回调: 去添加/修改分类
  */
  handleOk = () => {
    //进行表单统一整体验证
    this.form.validateFields(async (err, values) => {
      if (!err) {
        //验证通过，得到输入数据
        const { categoryName } = values

        const { showStatus } = this.state
        let result, action
        if (showStatus === 1) { //添加分类
          action = '添加'
          //发添加分类的请求
          result = await reqAddCategory(categoryName)
        } else { //修改分类
          action = '修改'
          const categoryId = this.category._id
          //发修改（更新）分类的请求
          result = await reqUpdateCategory({ categoryId, categoryName })
        }

        // 根据相应结果，做不同处理
        const { status, msg } = result
        if (status === 0) {
          message.success(action + '分类成功')

          // 重置一组输入表单控件的值,即重置输入数据(变成了初始值),重置为initialVale的值,相当于没有输入，即相当于没有在表单框中输入过数据
          this.form.resetFields()

          // 隐藏确认框(注意：这里antd框架是用display:none来隐藏Modal模态对话框实现的，而不是删除掉这个元素)
          this.setState({
            showStatus: 0
          });

          // 重新获取最新的分类列表显示
          this.getCategorys()
        } else if (status === 1) {
          message.error(msg);
          // 重新获取分类列表显示
          this.getCategorys()
        } else {
          message.error(action + '分类失败')
        }
      }
    })
  }

  /*
    点击取消(cancel)的回调
  */
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })
    //重置一组输入表单控件的值,即重置输入数据(变成了初始值)，重置为initialVale的值，相当于没有输入，即相当于没有在表单框中输入过数据
    this.form.resetFields()
  }

  componentDidMount() {
    this.getCategorys()
  }

  componentWillUnmount() {
    //不能对未安装的(或者已经卸载的）组件执行响应状态更新（setState）,以免造成内存泄漏
    //即组件在卸载之后(比如你切换路由卸载一些组件),过期的页面中请求还没完成，而请求完成后却依然去更新了状态state（这里可能是setState），但此时此组件已被卸载了，不存在了。因此会造成内存泄漏，会报警告错误。
    //因此要在卸载组件时(在componentWillUnmount()中)，取消异步任务setState()，即将setState()方法设为空函数。这样就不会警告报错了。
    this.setState = () => { }
  }

  render() {
    //取出状态数据
    const { categorys, loading, showStatus } = this.state
    //读取修改(更新)名称
    const category = this.category || {}
    //Card右上角的结构
    const extra = (
      <Button type="primary" onClick={() => {
        this.setState({ showStatus: 1 }) //this.setSate()是异步的
        this.category = null
      }}>
        <Icon type="plus" />
        添加
      </Button>
    );

    return (
      <div>
        <Card extra={extra}>
          <Table
            bordered
            loading={loading}
            columns={this.columns}
            dataSource={categorys}
            rowKey="_id"
            pagination={{ defaultPageSize: 6, showQuickJumper: true }}
          />

          <Modal
            title={showStatus === 1 ? '添加分类' : '修改分类'}
            visible={showStatus !== 0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdateForm setForm={form => this.form = form} categoryName={category.name} />
          </Modal>
        </Card>
      </div>
    )
  }
}
