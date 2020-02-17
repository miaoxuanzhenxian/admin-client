/*
  应用根组件
  UI组件: 负责显示(初始显示和更新显示)
  在编码上没有使用到任何redux相关语法
*/
import React, { Component } from 'react'
import propTypes from 'prop-types';

export default class Counter extends Component {

  static propTypes = {
    count: propTypes.number.isRequired,
    increment: propTypes.func.isRequired,
    decrement: propTypes.func.isRequired,
    incrementAsync: propTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
  
    this.numberSelectRef = React.createRef()
  }

  increment = () => {
    const num = this.numberSelectRef.current.value * 1
    this.props.increment(num)
  }

  decrement = () => {
    const num = this.numberSelectRef.current.value * 1
    this.props.decrement(num)
  }

  incrementIfOdd = () => {
    const count = this.props.count
    if (count % 2 === 1) {
      const num = this.numberSelectRef.current.value * 1
      this.props.increment(num)
    }
  }

  incrementAsync = () => {
    const num = this.numberSelectRef.current.value * 1
    this.props.incrementAsync(num)
  }

  render() {
    const count = this.props.count

    return (
      <div>
        <p>click {count} times</p>
        <select ref={this.numberSelectRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select> &nbsp;
        <button onClick={this.increment}>+</button> &nbsp;
        <button onClick={this.decrement}>-</button> &nbsp;
        <button onClick={this.incrementIfOdd}>increment if odd</button> &nbsp;
        <button onClick={this.incrementAsync}>increment async</button>
      </div>
    )
  }
}
