import Loadable from 'react-loadable'
import Loading from '@/components/loading'


export default function loadable(loader) {
  return Loadable({
    loader,
    loading: Loading,
    timeout: 10000
  })
}
