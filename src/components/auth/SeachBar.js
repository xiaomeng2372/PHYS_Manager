import React, { Component } from "react";
import PropTypes from "prop-types";
import topicList from "./PhysTopics.json";
import classList from "./PhysClassNames.json";
import semesterList from "./Semesters.json";
import Table from 'react-bootstrap/Table';
import axios from "axios";
//TODO: 1. Added multiple filters 2. figure out how the logic of multiple filters
import { locationsAreEqual } from "history";
class SeachBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minYear: 1995,
      maxYear: 2020,
      semester: "SPRING",
      topicId: 1,
      course: "No Preference",
      questions: []
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

    let bigYear = this.state.maxYear === "" ? 9999:this.state.maxYear;
    let smallYear = this.state.minYear === "" ? 0:this.state.minYear;
    let semester = this.state.semester === "No Preference" ? "no" : this.state.semester;
    let course = this.state.course === "No Preference" ? "no" : this.state.course;
    let topicId = this.state.topicId;
    //var self = this;
    axios.get('http://localhost:3003/all', {
      params: {
        minYear: smallYear,
        maxYear: bigYear,
        semester: semester,
        topicId: topicId,
        course: course,
      }
    })
      .then((response) => {
        console.log(response);
        this.setState({questions: response.data})
      })
      .catch((error)=>{
        console.log(error);
      });

  }
  handleYearChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }
  handleSemesterChange(e) {
    this.setState({ semester: e.target.value });
  }
  handleTopicChange(e) {
    this.setState({ topicId: e.target.value });
    alert(this.state.topicId)
  }
  handleCourseChange(e) {
    this.setState({ course: e.target.value });
  }
  componentWillMount() {}

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    //const topics = topicList;
    return (
      <div className="searchContainer">
        <ul className="filterContainer">
          <label>From: </label>
          <input
            id="minYear"
            type="number"
            value={this.state.minYear}
            onChange={this.handleYearChange}
            min="0"
            max="9999"
          />
          <label>To: </label>
          <input
            id="maxYear"
            type="number"
            value={this.state.maxYear}
            onChange={this.handleYearChange}
            min="0"
            max="9999"
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
            value={this.state.topicId}
            onChange={this.handleTopicChange}
          >
            {topicList.map(eachTopic => (
              <option key={eachTopic.topic} value={eachTopic.topicId}>
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
        <Table striped bordered hover size="sm">
          <thead>
          <tr>
            <th>Question Number</th>
            <th>Average</th>
            <th>Standard Deviation</th>
            <th>Correlation</th>
            <th>Options</th>
          </tr>
          </thead>
          <tbody>
          {this.state.questions.map(eachQuestion => (
            <tr id={eachQuestion.id}>
            <td>{eachQuestion.question_num}</td>
            <td>{eachQuestion.avg}</td>
            <td>{eachQuestion.std_dev}</td>
              <td> {eachQuestion.correlation}</td>
              <td><button id={eachQuestion.url}>View</button> <button id={eachQuestion.url}>Download</button> <button id={eachQuestion.url}>Like</button>  </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

SeachBar.propTypes = {};

export default SeachBar;
