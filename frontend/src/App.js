import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddJobs from "./components/add-jobs.component";
import Tutorial from "./components/jobs.component";
import JobsList from "./components/jobs-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
            <a href="/jobs" className="navbar-brand">
              Jobs Portal
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/jobs"} className="nav-link">
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                  Add Job
                </Link>
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/jobs"]} component={JobsList} />
              <Route exact path="/add" component={AddJobs} />
              <Route path="/jobs/:id" component={Tutorial} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
