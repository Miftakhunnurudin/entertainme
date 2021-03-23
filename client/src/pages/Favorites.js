import {GET_FAVORITES} from '../config/query'
import {useQuery} from '@apollo/client'
import ItemCard from '../components/ItemCard'

export default function Favorite () {
  const {data,loading,error} = useQuery(GET_FAVORITES)

  if (loading){
    return <h1>Loading</h1>
  }

  function deleteHandlerMovie () {

  }

  // console.log(data);
  const {favorites} = data
  return (
    <div style={{minWidth:'80vw'}}>
      <div className="shadow-lg p-3 rounded card">
        <h1>Favorites</h1>
      </div>
      <div className="mt-3 shadow-lg p-3 rounded card">
        <div className="row d-flex justify-content-start mt-3" style={{minHeight:'55vh'}}>
            {
              favorites.map(favorite =>{
                const path = '/'+favorite?.__typename?.toLowerCase()+'s/'
                return <ItemCard key={favorite._id} path={path} item={favorite} className="mr-3" deleteHandler={deleteHandlerMovie}/>
              })
            }
        </div>
      </div>
    </div>
  )
}