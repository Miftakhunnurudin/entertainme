import {
  Link,
  useHistory
} from 'react-router-dom'
import '../App.css'

export default function Navbar () {
  let history = useHistory()
  const favoriteOnClickHandler = () => {
      history.push('/favorite')
  }
  return (
      <nav className="navbar navbar-light bg-dark fixed-top w-100">
          <div className="container-fluid justify-content-start align-items-baseline">
              <Link className="navbar-brand text-light" to="/">Home</Link>
              <Link className="navbar-brand text-light" to="/movies/">Movies</Link>
              <Link className="navbar-brand text-light" to="/series/">TV Series</Link>
              <Link className="navbar-brand text-light" to="/favorites/">Favorites</Link>
          </div>
      </nav>
  )
}