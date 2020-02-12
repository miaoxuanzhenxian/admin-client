/*
应用根组件
*/
import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }

    this.numberSelectRef = React.createRef()
  }

  increment = () => {
    const num = this.numberSelectRef.current.value * 1
    this.setState({
      count: this.state.count + num
    })
  }

  decrement = () => {
    const num = this.numberSelectRef.current.value * 1
    this.setState({
      count: this.state.count - num
    })
  }

  incrementIfOdd = () => {
    const { count } = this.state
    if (count % 2 === 1) {
      const num = this.numberSelectRef.current.value * 1
      this.setState({
        count: count + num
      })
    }
  }

  incrementAsync = () => {
    const num = this.numberSelectRef.current.value * 1
    setTimeout(() => {
      this.setState({
        count: this.state.count + num
      })
    }, 1000);
  }

  render() {
    const { count } = this.state

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
