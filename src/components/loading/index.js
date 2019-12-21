import React, { Component } from 'react';
import { Spin, Icon } from 'antd';

import style from './index.module.less';

export default class Loading extends Component {
  render() {
    const antIcon = <Icon type="loading" style={{ color: 'blue' }} spin />;
    return (
      <div className={style.loading} style={this.props.style}>
        <Spin indicator={ antIcon } /> Loading......
      </div>
    )
  }
}
