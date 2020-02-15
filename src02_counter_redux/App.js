/*
应用根组件
*/
import React, { Component } from 'react'
import propTypes from 'prop-types';

import { increment, decrement, } from './redux/actions';

export default class App extends Component {

  static propTypes = {
    store: propTypes.object.isRequired
  }

  constructor(props) {
    super(props)
  
    this.numberSelectRef = React.createRef()
  }

  increment = () => {
    const num = this.numberSelectRef.current.value * 1
    this.props.store.dispatch(increment(num))
  }

  decrement = () => {
    const num = this.numberSelectRef.current.value * 1
    this.props.store.dispatch(decrement(num))
  }

  incrementIfOdd = () => {
    const count = this.props.store.getState()
    if (count % 2 === 1) {
      const num = this.numberSelectRef.current.value * 1
      this.props.store.dispatch(increment(num))
    }
  }

  incrementAsync = () => {
    const num = this.numberSelectRef.current.value * 1
    setTimeout(() => {
      this.props.store.dispatch(increment(num))
    }, 1000);
  }

  render() {
    const count = this.props.store.getState()

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
