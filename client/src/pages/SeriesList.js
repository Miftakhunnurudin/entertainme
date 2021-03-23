import ItemCard from '../components/ItemCard'
import {useHistory,useRouteMatch} from 'react-router-dom'
import {useQuery, useMutation} from '@apollo/client'
import { DELETE_SERIE, GET_SERIES, GET_ENTERTAINME} from '../config/query'


export default function SerisList(){
  const {data, loading, error} = useQuery(GET_SERIES)
  const history = useHistory()
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

  const {series} = data
  return (
    <div style={{minWidth:'80vw'}}>
      <div className="shadow-lg p-3 rounded card">
        <h1>Series</h1>
      </div>
      <div className="mt-3 shadow-lg p-3 rounded card">
        <div className="col-md-4 justify-content-start d-flex">
          <button className="btn btn-primary" onClick={() => history.push(url+'add')}>Add Serie</button>
        </div>
        <div className="row d-flex justify-content-start mt-3" style={{minHeight:'55vh'}}>
            {
              series.map(serie =>{
                return <ItemCard key={serie._id} path={path} item={serie} className="mr-3" deleteHandler={deleteHandlerSerie}/>
              })
            }
        </div>
      </div>
    </div>
  )
}