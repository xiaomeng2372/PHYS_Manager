import React, { Component } from "react";
import PropTypes from "prop-types";
import topicList from "./PhysTopics.json";
import classList from "./PhysClassNames.json";
import semesterList from "./Semesters.json";
import { locationsAreEqual } from "history";
import UploadPage from "./UploadPage.js";

class SeachBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: 4,
      semester: "",
      topic: "",
      course: "",
      users: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // test localhost:3003/users/ api call
  handleSubmit(e) {
    e.preventDefault();
    var id = this.state.year;
    fetch("http://localhost:3003/users/" + id)
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(console.log);
  }
  handleYearChange(e) {
    this.setState({ year: e.target.value });
  }
  handleSemesterChange(e) {
    this.setState({ semester: e.target.value });
  }
  handleTopicChange(e) {
    this.setState({ topic: e.target.value });
  }
  handleCourseChange(e) {
    this.setState({ course: e.target.value });
  }
  componentWillMount() {}

  componentDidMount() {
    fetch("http://localhost:3003/users")
      .then(res => res.json())
      .then(data => {
        this.setState({ users: data });
      })
      .catch(console.log);
  }

  componentWillReceiveProps(nextProps) {}

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    //const topics = topicList;
    return (
      <div className="searchContainer">
        <ul className="filterContainer">
          <label>Year: </label>
          <input
            id="year"
            type="number"
            value={this.state.year}
            onChange={this.handleYearChange}
          />
          <label>Semester: </label>
          <select
            id="semester"
            value={this.state.semester}
            onChange={this.handleSemesterChange}
          >
            {semesterList.map(eachSemester => (
              <option key={eachSemester.name} value={eachSemester.name}>
                {eachSemester.name}
              </option>
            ))}
          </select>
          <label> Topics: </label>
          <select
            id="topics"
            value={this.state.topic}
            onChange={this.handleTopicChange}
          >
            {topicList.map(eachTopic => (
              <option key={eachTopic.topic} value={eachTopic.topic}>
                {eachTopic.topic}
              </option>
            ))}
          </select>
          <label>Course Name: </label>
          <select
            id="class"
            value={this.state.course}
            onChange={this.handleCourseChange}
          >
            {classList.map(eachCourse => (
              <option key={eachCourse.name} value={eachCourse.name}>
                {eachCourse.name}
              </option>
            ))}
          </select>
        </ul>
        <form onSubmit={this.handleSubmit}>
          <input id="submit" type="submit" value="Search" />
        </form>
        <UploadPage />
        <ul>
          {this.state.users.map(eachUser => (
            <li key={eachUser.id}>{eachUser.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

SeachBar.propTypes = {};

export default SeachBar;
