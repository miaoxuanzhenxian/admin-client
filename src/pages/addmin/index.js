import React, { Component } from 'react';

import style1 from './index.module.less';

export default class Admin extends Component {
  render() {
    return (
      <div>
        Admin
        <div className={style1.test}>
          bbb
          <p className={style1.testp}>ppppp</p>
        </div>
      </div>
    )
  }
}
