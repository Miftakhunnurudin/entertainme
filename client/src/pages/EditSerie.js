import {UPDATE_SERIE, GET_SERIES, GET_ENTERTAINME, GET_SERIE} from '../config/query'
import {useMutation,useQuery}from '@apollo/client'
import EditForm from '../components/EditForm'
import {useParams} from 'react-router-dom'

export default function EditSerie () {
  const {id} = useParams()
  const {data, loading, error} = useQuery(GET_SERIE,{
    variables: {
      id
    }
  })
  const [editSerie] = useMutation(UPDATE_SERIE,{
    refetchQueries:[{query:GET_SERIES},{query:GET_ENTERTAINME}]
  })

  function onSubmitSerie(data) {
    const {_id,title,overview,popularity,tags,poster_path} = data
    editSerie({
      variables:{
        serie: {_id,title,overview,popularity,tags,poster_path}
      }
    })
  }

  if (loading){
    return <h1>Loading</h1>
  }
  const {serie} = data
  // console.log(serie,data);
  return (
    <div>
      <EditForm onSubmit={onSubmitSerie} item={serie}/>
    </div>
  )
}