import {ADD_SERIE, GET_SERIES, GET_ENTERTAINME} from '../config/query'
import {useMutation}from '@apollo/client'
import AddForm from '../components/AddForm'

export default function AddMovie () {
  const [addSerie] = useMutation(ADD_SERIE,{
    refetchQueries:[{query:GET_SERIES},{query:GET_ENTERTAINME}]
  })

  function onSubmitSerie(data) {
    addSerie({
      variables:{
        serie: data
      }
    })
  }

  return (
    <div>
      <AddForm onSubmit={onSubmitSerie}/>
    </div>
  )
}