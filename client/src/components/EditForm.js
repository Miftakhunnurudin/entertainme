import {useState} from 'react'
import {useHistory,useRouteMatch} from 'react-router-dom'
import Select from 'react-select/creatable'

export default function EditForm (props){
  const {onSubmit, item} = props
  const {title,poster_path,overview,popularity,tags:defaultTags,_id} = item
  const [editItem, setEditItem] = useState({...item,popularity:+popularity, tags:defaultTags})
  const history = useHistory()
  const {path,url} = useRouteMatch()
  const [titlePage,setTitlePage] = useState(path.includes('movie')? 'Movie' : 'Serie')
  const [tags,setTags] = useState(defaultTags?.map(tag => {return {value: tag, label: tag}}))

  // console.log(tags);
  const options = [
    {value: 'Action', label: 'Action'},
    {value: 'Adventure', label: 'Adventure'},
    {value: 'Animation', label: 'Animation'},
    {value: 'Drama', label: 'Drama'},
    {value: 'Horror', label: 'Horror'},
    {value: 'Sci-fi', label: 'Sci-fi'},
    {value: 'Slice of life', label: 'Slice of life'},
    {value: 'Zombie', label: 'Zombie'},
  ]

  function onChangeSelect(e){
    setTags(e)
  }

  function handleInputChange(e) {
    const { value, name } = e.target;
    setEditItem({
      ...editItem,
      [name]: value
    });
  }

  function onClickSubmitHandler(e) {
    e.preventDefault();
    const {title,poster_path,overview,popularity} = editItem

    if (!title){
      console.log('title required');
    }else if (!overview){
      console.log('overview required');
    }else if (popularity<0){
      console.log('popularity required');
    }else if (!poster_path){
      console.log('poster_path required');
    }else{
      editItem.popularity = +editItem.popularity
      // console.log(tags);
      editItem.tags = tags.map(tag => tag.value)
      onSubmit(editItem)
      history.push(url.replace('edit/'+_id,''))
    }
  }

  return (
    <>
    <div className="card shadow-lg" style={{width:'40em',padding:'20px', textAlign:'left'}}>
      <h1 className="text-center">Edit {titlePage} </h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange={handleInputChange} defaultValue={title}/>
        </div>
        <div className="mb-3">
          <label htmlFor="overview" className="form-label">Overview</label>
          <input type="text" className="form-control" id="overview" name="overview" onChange={handleInputChange} defaultValue={overview}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags</label>
          <Select options={options} isMulti={true} onChange={onChangeSelect} defaultValue={tags}/>
        </div>
        <div className="mb-3">
          <label htmlFor="popularity" className="form-label">Popularity</label>
          <input type="number" className="form-control" id="popularity" name="popularity" onChange={handleInputChange} defaultValue={popularity}/>
        </div>
        <div className="mb-3">
          <label htmlFor="poster" className="form-label">Poster Link</label>
          <input type="text" className="form-control" id="poster" name="poster_path" onChange={handleInputChange} defaultValue={poster_path}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={onClickSubmitHandler}>Submit</button>
      </form>
    </div>
    </>
  )
}