import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
//import PdfViewer from "./PdfViewer"
class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onClickHandle = this.onClickHandle.bind(this);
  }
  onChangeHandler(e) {
    this.setState({ selectedFile: e.target.files[0], loaded: 0 });
  }

  onClickHandle(e) {
    e.preventDefault();
    /*
    const info = new FormData(); // Send the API request in a form
    info.append("file", this.state.selectedFile); // key -> value in the form
    axios.post("http://localhost:3003/uploadFile", info, {}).then(result => {
      console.log(result.statusText);
      alert("success!")
    });
     */
  }

  componentDidMount() {}

// html
  render() {
    return (
        <section className="UploadContainer">
          <h1> Upload Page</h1>
          <label>Upload your file: </label>
          <input
            type="file"
            class="form-control"
            multiple=""
            name="file"
            onChange={this.onChangeHandler}
          />
          <button type="button" onClick={this.onClickHandle}>
            Upload
          </button>
        </section>
    );
  }
}

UploadPage.propTypes = {};

export default UploadPage;
