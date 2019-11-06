import React from 'react';
import { Router, Route } from 'react-router-dom';
import { history } from 'navigate';
import * as Paths from './paths';
import * as Pages from './pages';
import * as Layout from './layout';

import 'bootstrap/dist/css/bootstrap.min.css';
import './shop-homepage.css';

function App() {
  return (
    <>    
      <Router history={history}>
        <Layout.NavBar />
        <div className="container">
          <Route path={Paths.Home} exact component={Pages.Home} />
          <Route path={Paths.AboutUs} component={Pages.AboutUs} />
          <Route path={Paths.Profiles} component={Pages.Profiles} />
        </div>
        <Layout.Footer />
      </Router>
    </>
  );
}



export default App;
