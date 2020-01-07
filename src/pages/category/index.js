import React, { Component } from 'react';
import { Card, Button, Icon, Table, message, Modal } from 'antd';
import LinkButton from '@/components/link-button';

import style from './index.module.less';
import { reqCategorys } from '@/api';
import AddUpdateForm from './add-update-form';

export default class Category extends Component {
  constructor(props) {
    super(props)

    this.initColumns();

    this.state = {
      categorys: [],
      loading: false, //是否正在请求加载中
      showStatus: 0 // 0: 不显示, 1: 显示添加, 2: 显示修改
    }
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
        render: () => <LinkButton>修改分类</LinkButton>
      },
    ];
  }

  /*
    异步获取分类列表显示
  */
  getCategorys = async () => {
    //显示loading
    this.setState({ loading: true });
    //发异步ajax请求
    const result = await reqCategorys();
    if (result.status === 0) { //成功了
      //取出分类列表
      const categorys = result.data;
      //更新状态categorys数据
      this.setState({
        categorys,
        loading: false //成功了后隐藏loading
      });
    } else {
      message.error('获取分类列表失败');
      this.setState({ loading: false }); //获取分类列表失败后隐藏loading
    }
  }

  /* 
    点击确定(ok)的回调: 去添加/修改分类
  */
  handleOk = () => {

  }

  /*
    点击取消(cancel)的回调
  */
  handleCancel = () => {
    this.setState({
      showStatus: 0
    });
  }

  componentDidMount() {
    this.getCategorys();
  }

  componentWillUnmount() {
    //不能对未安装的(或者已经卸载的）组件执行响应状态更新（setState）,以免造成内存泄漏
    //即组件在卸载之后(比如你切换路由卸载一些组件),过期的页面中请求还没完成，而请求完成后却依然去更新了状态state（这里可能是setState），但此时此组件已被卸载了，不存在了。因此会造成内存泄漏，会报警告错误。
    //因此要在卸载组件时(在componentWillUnmount()中)，取消异步任务setState()，即将setState()方法设为空函数。这样就不会警告报错了。
    this.setState = () => { }
  }

  render() {
    //取出状态数据
    const { categorys, loading, showStatus } = this.state;
    //Card右上角的结构
    const extra = (
      <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>
        <Icon type="plus" />
        添加
      </Button>
    );
    return (
      <div>
        <Card extra={extra}>
          <Table
            loading={loading}
            columns={this.columns}
            dataSource={categorys}
            rowKey="_id"
            bordered
            pagination={{ defaultPageSize: 6, showQuickJumper: true }}
          />

          <Modal
            title={showStatus === 1 ? '添加分类' : '修改分类'}
            visible={showStatus !== 0}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <AddUpdateForm />
          </Modal>
        </Card>
      </div>
    )
  }
}
