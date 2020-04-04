import React from 'react'
import { Button, Spin } from 'antd'

import style from './index.module.less'


export default function Loading(props) {
  if (props.error) {
    // When the loader has errored
    return (
      <div className={style.loading}>
        加载错误，请<Button type="primary" onClick={props.retry}>重试</Button>
      </div>
    )
  } else if (props.timedOut) {
    // When the loader has taken longer than the timeout,这个功能在默认情况下是禁用的。要打开它,可以在Loadable中自定义超时选项timeout
    return (
      <div className={style.loading}>
        加载超时，请<Button type="primary" onClick={props.retry}>重试</Button>
      </div>
    )
  } else if (props.pastDelay) {
    // When the loader has taken longer than the delay,delay默认是200ms,但也可以在Loadable中自定义延迟
    return (
      <div className={style.loading}>
        <Spin />加载中...
      </div>
    )
  } else {
    // When the loader has just started
    return null
  }
}
