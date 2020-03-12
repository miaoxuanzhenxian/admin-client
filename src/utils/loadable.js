import Loadable from 'react-loadable'
import Loading from '@/components/loading'


export default (loader) => {
  return Loadable({
    loader,
    loading: Loading,
    timeout: 10000,
  })
}