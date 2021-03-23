import {ADD_MOVIE, GET_MOVIES, GET_ENTERTAINME} from '../config/query'
import {useMutation}from '@apollo/client'
import AddForm from '../components/AddForm'

export default function AddMovie () {
  const [addMovie] = useMutation(ADD_MOVIE,{
    refetchQueries:[{query:GET_MOVIES},{query:GET_ENTERTAINME}]
  })

  function onSubmitMovie(data) {
    addMovie({
      variables:{
        movie: data
      }
    })
  }

  return (
    <div>
      <AddForm onSubmit={onSubmitMovie}/>
    </div>
  )
}