import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
  onClickHandle() {
    const info = new FormData(); // Send the API request in a form
    info.append("file", this.state.selectedFile); // key -> value in the form
    axios.post("http://localhost:3003/upload", info, {}).then(result => {
      console.log(result.statusText);
    });
  }
  componentWillMount() {}

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {}

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {}

  render() {
    return (
      <div>
        <div class="container">
          <label>Upload your file: </label>
          <input
            type="file"
            class="form-control"
            multiple=""
            name="file"
            onChange={this.onChangeHandler}
          />
        </div>
        <button type="button" onClick={this.onClickHandle}>
          Upload
        </button>
      </div>
    );
  }
}

UploadPage.propTypes = {};

export default UploadPage;
