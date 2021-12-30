import React, { Component } from "react";
import JobsDataService from "../services/jobs.service";
import { Link } from "react-router-dom";

export default class JobsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveJobs = this.retrieveJobs.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveJob = this.setActiveJob.bind(this);
    this.removeAllJobs = this.removeAllJobs.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      jobs: [],
      currentjob: null,
      currentIndex: -1,
      searchTitle: "",
      searchStatus: false
    };
  }

  componentDidMount() {
    this.retrieveJobs();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveJobs() {
    JobsDataService.getAll()
      .then(response => {
        this.setState({
          jobs: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveJobs();
    this.setState({
      currentjob: null,
      currentIndex: -1
    });
  }

  setActiveJob(tutorial, index) {
    this.setState({
      currentjob: tutorial,
      currentIndex: index
    });
  }

  removeAllJobs() {
    JobsDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    JobsDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          jobs: response.data,
          currentjob: null
        });
        console.log(response.data);
        if (response.data.length === 0)
          this.setState({ searchStatus: true })
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, searchStatus, jobs, currentjob, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Jobs List</h4>

          <ul className="list-group">
            {jobs &&
              jobs.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveJob(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllJobs}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentjob && jobs ? (
            <div>
              <h4>Job Details</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentjob.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentjob.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentjob.published ? "Published" : "Pending"}
              </div>

              <Link
                to={"/jobs/" + currentjob.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div className='ml-3 mt-5'>
                <p>Please select a job to view details</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}
