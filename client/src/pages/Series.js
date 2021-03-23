import {
  Switch,
  Route,
  useRouteMatch
} from 'react-router-dom'

import SeriesList from './SeriesList'
import AddSerie from './AddSerie'
import DetailSerie from './DetailSerie'
import EditSerie from './EditSerie'

export default function Movies () {
  const {path, url} = useRouteMatch()

  return (
    <Switch>
      <Route exact path={path}>
        <SeriesList/>
      </Route>
      <Route path={path+'add'}>
        <AddSerie/>
      </Route>
      <Route path={path+'edit/:id'}>
        <EditSerie/>
      </Route>
      <Route path={path+':id'}>
        <DetailSerie/>
      </Route>
    </Switch>
  )
}