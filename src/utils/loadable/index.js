import Loadable from 'react-loadable'
import Loading from './loading'


export default function loadable(loader, loading = Loading) { // loading = Loading表示loading过场组件默认采用引入进来的通用的loadable的Loading组件，但若外部手动传入了loading，则采用传入的过场组件
  return Loadable({
    loader,
    loading, // 这个选项是必需的，如果你不想渲染任何东西，什么都不想显示,不想显示过度的loading效果的话，只需要让loading方法返回null就可以啦,即loading: () => null,也就是说调用loadable()方法时，给其第二个参数传入() => null即可
    timeout: 10000
  })
}
