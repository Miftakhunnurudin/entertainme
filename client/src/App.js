import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import {ApolloProvider} from '@apollo/client';
import client from './config/apolloclient'

import Movies from "./pages/Movies";
import Series from "./pages/Series";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

import Navbar from "./components/Navbar"

function App() {
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
            <Navbar/>
            <div className="container d-flex justify-content-center mb-5" style={{marginTop:'5em'}}>
              <Switch>
                <Route exact path="/">
                  <Home/>
                </Route>
                <Route path="/movies/">
                  <Movies/>
                </Route>
                <Route path="/series/">
                  <Series/>
                </Route>
                <Route path="/favorites/">
                  <Favorites/>
                </Route>
              </Switch>
            </div>
          </Router>
      </ApolloProvider>
    </div>
  );
}

export default App;
