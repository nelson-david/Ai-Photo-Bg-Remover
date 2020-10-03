import React from 'react';
import { Switch, BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import Navbar from './components/Navbar';
import Body from './pages/Body';
import './index.css';

function App() {

  return (
    <div className="container-fluid">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Body} />
        </Switch>
      </Router>
    </div>
  );

}

export default App;
