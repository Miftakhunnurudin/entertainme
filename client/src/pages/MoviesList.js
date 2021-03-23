import {useQuery, useMutation} from '@apollo/client'
import ItemCard from '../components/ItemCard'
import {useHistory,useRouteMatch} from 'react-router-dom'
import {DELETE_MOVIE, GET_MOVIES, GET_ENTERTAINME} from '../config/query'

export default function MoviesList (){
  const {data, loading, error} = useQuery(GET_MOVIES)
  // const {data:dataFav, loading:loadFavorites} = useQuery(GET_FAVORITES)
  const history = useHistory()
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

  const {movies} = data
  return (
    <div style={{minWidth:'80vw'}}>
      <div className="shadow-lg p-3 rounded card">
        <h1>Movies</h1>
      </div>
      <div className="mt-3 shadow-lg p-3 rounded card">
        <div className="col-md-4 justify-content-start d-flex">
          <button className="btn btn-primary" onClick={() => history.push(url+'add')}>Add Movie</button>
        </div>
        <div className="row d-flex justify-content-start mt-3" style={{minHeight:'55vh'}}>
            {
              movies.map(movie =>{
                return <ItemCard key={movie._id} path={path} item={movie} className="mr-3" deleteHandler={deleteHandlerMovie}/>
              })
            }
        </div>
      </div>
    </div>
  )
}