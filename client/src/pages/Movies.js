import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import MoviesList from './MoviesList'
import AddMovie from './AddMovie'
import DetailMovie from './DetailMovie'
import EditMovie from './EditMovie'


export default function Movies () {
  const {path, url} = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <MoviesList/>
      </Route>
      <Route path={path+'add'}>
        <AddMovie/>
      </Route>
      <Route path={path+'edit/:id'}>
        <EditMovie/>
      </Route>
      <Route path={path+':id'}>
        <DetailMovie/>
      </Route>
    </Switch>
  )
}