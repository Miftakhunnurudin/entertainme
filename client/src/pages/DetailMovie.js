import {useQuery, useMutation} from '@apollo/client'
import {GET_MOVIE, DELETE_MOVIE, GET_MOVIES, GET_ENTERTAINME} from '../config/query'
import DetailItem from '../components/DetailItem'
import {useRouteMatch,useParams} from 'react-router-dom'

export default function DetailMovie () {
  const {id} = useParams()
  const {data, loading, error} = useQuery(GET_MOVIE,{
    variables: {
      id
    }
  })
  const {path,url} = useRouteMatch()

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{query: GET_MOVIES},{query: GET_ENTERTAINME}]
  })

  function deleteHandlerMovie(id){
    deleteMovie({
      variables:{
        id
      }
    })
  }

  if (loading){
    return <h1>Loading</h1>
  }
  const {movie} = data

  return (
    <div>
      <DetailItem item={movie} path={path} deleteHandler={deleteHandlerMovie}/>
    </div>
  )
}