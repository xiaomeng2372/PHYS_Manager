import React, { Component } from "react";
import PropTypes from "prop-types";
import topicList from "./PhysTopics.json";
import classList from "./PhysClassNames.json";
import semesterList from "./Semesters.json";
import Table from 'react-bootstrap/Table';
import Button from '@material-ui/core/Button';
import axios from "axios";
import PdfViewer from "./PdfViewer";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import file1 from "./1.pdf"
import file2 from "./2.pdf"
import file3 from "./test.pdf"
//TODO: 1. Added multiple filters 2. figure out how the logic of multiple filters
import { locationsAreEqual } from "history";
import { lightBlue } from "@material-ui/core/colors";
const useStyles = {
  root: {
    flexGrow: 1,
  },
  paper: {
    //padding: theme.spacing(1),
    textAlign: 'center',
    color: lightBlue,
  },
};

class SeachBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      minYear: 1995,
      maxYear: 2020,
      semester: "SPRING",
      topicId: 1,
      course: "No Preference",
      questions: [],
      fileInfo: null,
      startingPage: 1
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleSemesterChange = this.handleSemesterChange.bind(this);
    this.handleTopicChange = this.handleTopicChange.bind(this);
    this.handleCourseChange = this.handleCourseChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
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
  handleFileChange(e, fileName, startingPage){
    this.setState({fileInfo: fileName, startingPage: startingPage});
  }

  //Initial API call

  componentDidMount() {
    axios.get('http://localhost:3003/question')
      .then((response) => {
        console.log(response);
        this.setState({questions: response.data, fileInfo: file2})
      })
      .catch((error)=>{
        console.log(error);
      });
  }

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
          <Button variant="contained" type="submit" color="primary">
            Search
          </Button>
        </form>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
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
              <td>
                <button id={eachQuestion.url} onClick={(e) =>this.handleFileChange(e, file1, 1)}>View</button>
                <button id={eachQuestion.url} onClick={(e) =>this.handleFileChange(e, file1, 2)}>View Page2</button>
                <button id={eachQuestion.url} onClick={(e) =>this.handleFileChange(e, file3, 2)}>View Another Doc </button>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={useStyles.paper}>
            <PdfViewer fileInfo={this.state.fileInfo} pgNumber={this.state.startingPage}/>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

SeachBar.propTypes = {};

export default SeachBar;
