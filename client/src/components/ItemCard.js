import {GET_FAVORITES} from '../config/query'
import favoritesVar from '../config/cache'
import {useHistory} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {useEffect,useState} from 'react'

function ItemCard (props) {
  const {data,loading,error} = useQuery(GET_FAVORITES)
  const [isFavorite,setIsFavorite] = useState(false)
  const {path, item, deleteHandler} = props;
  const {_id:id,title, poster_path, tags} = item
  const history = useHistory()
  let path_used = path.replace('favorites/','')
  
  useEffect(() => {
    const {favorites} = data
    setIsFavorite(favorites.find(fav => fav._id === id)? true : false)
  },[data])

  function onEditClick () {
    history.push(`${path_used}edit/${id}`)
  }
  
  function onDetailClick () {
    history.push(`${path_used}${id}`)
  }
  return (
    <>
      <div className="col-4 d-flex justify-content-center" style={{marginBottom:'20px'}}>
        <div className="card shadow" style={{width:"18rem", padding:'10px',}}>
          <div className="d-flex justify-content-center mb-2" style={{height:'300px'}}>
            <img src={poster_path} alt="" className="card-img-top" style={{height:'inherit', width:'auto', margin:'5px'}}></img>
          </div>
          <p style={{fontSize:'20px', fontWeight:'bold'}}>
              {title}
          </p>
          <span>
              {
                tags?.map(tag => {
                  return (
                    <i 
                      className="ml-1 d-inline-block mb-2"
                      style={{padding:'1px', fontSize:'14px'}}
                      key={tag}
                    > {tag}, </i>
                  ) 
                })
              }
          </span>
          <div className="d-flex justify-content-end">
            {
              isFavorite?
                <i className="bi-heart btn btn-primary ml-2" onClick={() => favoritesVar([...favoritesVar().filter(fav => fav._id !== id)])}></i>
              :
                <i className="bi-heart-fill btn btn-primary ml-2" onClick={() => favoritesVar([...favoritesVar(),item])}></i>
            }
            <i className="bi-info-circle-fill btn btn-info ml-2" onClick={onDetailClick}></i>
            <i className="bi-pencil btn btn-success ml-2" onClick={onEditClick}></i>
            <i className="bi-trash btn btn-danger ml-2" onClick={() => deleteHandler(id)}></i>
          </div>
        </div>
      </div>
    </>
  )
}

export default ItemCard