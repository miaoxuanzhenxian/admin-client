import React, { PureComponent } from 'react'
import propTypes from 'prop-types'
import { Form, Input, Tree } from 'antd'

import menuList from '@/config/menuConfig'

const { TreeNode } = Tree

export default class AuthForm extends PureComponent {

  static propTypes = {
    role: propTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      checkedKeys: []
    }

    // 根据传入角色的menus来更新checkedKeys状态
    this.state.checkedKeys = this.props.role.menus

    this.treeNodes = this.getTreeNodes(menuList)
  }

  /*
    暴露menus，获取menus,即获取checkedKeys
  */
  getMenus = () => this.state.checkedKeys


  getTreeNodes = (menuList) => {
    return menuList.reduce((pre, item) => {
      if (!item.public) {
        pre.push(
          <TreeNode title={item.title} key={item.key}>
            {item.children ? this.getTreeNodes(item.children) : null}
          </TreeNode>
        )
      }
      return pre
    }, [])
  }

  /* 
    进行勾选操作时的回调
    checkedKeys: 最新的所有勾选的node的key的数组
  */
  handleCheck = (checkedKeys) => {
    // 更新状态
    this.setState({ checkedKeys })
  }

  /* 
    组件接收到新的标签属性时就会执行(初始渲染显示时不会调用)
    nextProps: 接收到的包含新的属性的对象
    请注意，如果父组件render执行导致该组件重新渲染，即使 props 没有更改，也会调用此方法。
  */
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log('UNSAFE_componentWillReceiveProps()')
    const checkedKeys = nextProps.role.menus
    this.setState({ checkedKeys }) // 因为此处如果父组件render执行导致该组件重新渲染，即使 props 没有更改，也会调用此方法,因此会频繁调用this.setState({ checkedKeys })从而导致render频繁更新渲染，因此使用PureComponent纯组件来使得checkedKeys状态值没有发生改变时，不调用render，从而提高效率。
  }

  render() {
    const { role } = this.props

    const { checkedKeys } = this.state

    // 指定Item布局的配置对象
    const formItemLayout = {
      labelCol: { span: 4 }, // 左侧label的宽度
      wrapperCol: { span: 15 }, // 右侧包裹的宽度
    }

    return (
      <div>
        <Form.Item label="角色名称" {...formItemLayout}>
          <Input value={role.name} disabled />
        </Form.Item>

        <Tree
          checkable
          defaultExpandAll
          checkedKeys={checkedKeys}
          onCheck={this.handleCheck}
        >
          <TreeNode title="平台权限" key="all">
            {this.treeNodes}
          </TreeNode>
        </Tree>
      </div>
    )
  }
}
