import {useQuery, useMutation} from '@apollo/client'
import {GET_SERIE, DELETE_SERIE, GET_SERIES, GET_ENTERTAINME} from '../config/query'
import DetailItem from '../components/DetailItem'
import {useRouteMatch,useParams} from 'react-router-dom'

export default function DetailSerie () {
  const {id} = useParams()
  const {data, loading, error} = useQuery(GET_SERIE,{
    variables: {
      id
    }
  })
  const {path,url} = useRouteMatch()

  const [deleteSerie] = useMutation(DELETE_SERIE, {
    refetchQueries: [{query: GET_SERIES},{query: GET_ENTERTAINME}]
  })

  function deleteHandlerSerie(id){
    deleteSerie({
      variables:{
        id
      }
    })
  }

  if (loading){
    return <h1>Loading</h1>
  }
  const {serie} = data

  return (
    <div>
      <DetailItem item={serie} path={path} deleteHandler={deleteHandlerSerie}/>
    </div>
  )
}