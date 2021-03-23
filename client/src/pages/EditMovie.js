import {UPDATE_MOVIE, GET_MOVIES, GET_ENTERTAINME, GET_MOVIE} from '../config/query'
import {useMutation,useQuery}from '@apollo/client'
import EditForm from '../components/EditForm'
import {useParams} from 'react-router-dom'

export default function EditMovie () {
  const {id} = useParams()
  const {data, loading, error} = useQuery(GET_MOVIE,{
    variables: {
      id
    }
  })
  const [editMovie] = useMutation(UPDATE_MOVIE,{
    refetchQueries:[{query:GET_MOVIES},{query:GET_ENTERTAINME}]
  })

  function onSubmitMovie(data) {
    const {_id,title,overview,popularity,tags,poster_path} = data
    editMovie({
      variables:{
        movie: {_id,title,overview,popularity,tags,poster_path}
      }
    })
  }

  if (loading){
    return <h1>Loading</h1>
  }
  const {movie} = data
  return (
    <div>
      <EditForm onSubmit={onSubmitMovie} item={movie}/>
    </div>
  )
}