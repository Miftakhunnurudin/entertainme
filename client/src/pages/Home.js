import {useQuery, useMutation} from '@apollo/client'
import ItemCard from '../components/ItemCard'
import {DELETE_MOVIE, DELETE_SERIE, GET_MOVIES, GET_SERIES, GET_ENTERTAINME} from '../config/query'

export default function Home () {
  const {data, loading, error} = useQuery(GET_ENTERTAINME)
  // const {data:dataFav, loading:loadFavorites} = useQuery(GET_FAVORITES)

  const [deleteMovie] = useMutation(DELETE_MOVIE, {
    refetchQueries: [{query: GET_MOVIES},{query: GET_ENTERTAINME}]
  })
  const [deleteSerie] = useMutation(DELETE_SERIE, {
    refetchQueries: [{query: GET_SERIES},{query: GET_ENTERTAINME}]
  })
  
  if (loading){
    return <h1>Loading</h1>
  }

  function deleteHandlerMovie(id){
    deleteMovie({
      variables:{
        id
      }
    })
  }

  function deleteHandlerSerie(id){
    deleteSerie({
      variables:{
        id
      }
    })
  }

  const {entertainme} = data
  const {movies, series} = entertainme
  return (
    <div style={{minWidth:'80vw'}}>
      <div className="shadow-lg p-3 rounded card">
        <h1>Home</h1>
      </div>
      <div className="mt-3 shadow-lg p-3 rounded card">
        <h3 className="text-left">Movies</h3>
        <div className="row d-flex justify-content-start mt-3" style={{minHeight:'55vh'}}>
            {
              movies.map(movie =>{
                return <ItemCard key={movie._id} path={'movies/'} item={movie} className="mr-3" deleteHandler={deleteHandlerMovie}/>
              })
            }
        </div>
      </div>
      <div className="mt-3 shadow-lg card p-3">
        <h3 className="text-left">Series</h3>
        <div className="row d-flex justify-content-start mt-3" style={{minHeight:'55vh'}}>
            {
              series.map(serie =>{
                return <ItemCard key={serie._id} path={'series/'} item={serie} deleteHandler={deleteHandlerSerie}/>
              })
            }
        </div>
      </div>
    </div>
  )
}