import {GET_FAVORITES} from '../config/query'
import favoritesVar from '../config/cache'
import {useHistory} from 'react-router-dom'
import {useQuery} from '@apollo/client'
import {useEffect,useState} from 'react'

function DetailItem (props) {
  const {data,loading,error} = useQuery(GET_FAVORITES)
  const [isFavorite,setIsFavorite] = useState(false)
  const {path, item, deleteHandler} = props;
  const {title, poster_path, overview, popularity, _id:id,tags} = item
  const history = useHistory()
  let path_used = path.replace(':id','')
  
  useEffect(() => {
    const {favorites} = data
    setIsFavorite(favorites.find(fav => fav._id === id)? true : false)
  },[data])

  function onEditClick () {
    console.log(`${path_used}edit/${id}`);
    history.push(`${path_used}edit/${id}`)
  }

    return (
      <>
        <div className="" style={{marginRight:'10px', marginBottom:'10px'}}>
          <div className="card shadow-lg rounded" style={{width:"40rem", padding:'20px', minHeight: '30rem'}}>
            <div className="d-flex ">
              <div className="d-flex justify-content-center mr-3">
                <img src={poster_path} alt="" className="card-img-top shadow-sm rounded" style={{height:'400px', width:'auto', margin:'5px'}}></img>
              </div>
              <div className="d-flex justify-content-start flex-column w-100 ml-3">
                <p style={{fontSize:'30px', fontWeight:'bold', marginBottom:'5px'}}>
                    {title}
                </p>
                <span style={{fontSize:'20px', fontWeight:'500', textAlign:'left', marginBottom:'10px'}}>
                    <b>Popularity :</b> {String(popularity)}
                </span>
                <p style={{fontSize:'17px', textAlign:'left'}}>
                    <b>Overview:</b> <br></br>
                    {overview}
                </p>
                <div className="h-100 d-flex align-items-end">
                  <div className="d-flex justify-content-end w-100">
                    {
                      isFavorite?
                        <i className="bi-heart btn btn-primary ml-2" onClick={() => favoritesVar([...favoritesVar().filter(fav => fav._id !== id)])}></i>
                      :
                        <i className="bi-heart-fill btn btn-primary ml-2" onClick={() => favoritesVar([...favoritesVar(),item])}></i>
                    }
                    <i className="bi-pencil btn btn-success ml-2" onClick={onEditClick}></i>
                    <i className="bi-trash btn btn-danger ml-2" onClick={() => deleteHandler(id)}></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )

}

export default DetailItem