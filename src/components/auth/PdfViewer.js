import React from 'react';
import { Container, Header, Grid, Form } from 'semantic-ui-react';
import { Document, Page } from 'react-pdf';
import pdfjsLib from 'pdfjs-dist/webpack';
import testPdf from './test.pdf';

// Citation: Learn how to use pdf react from https://github.com/rieckpil/blog-tutorials/blob/master
class PdfViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileInfo: props.fileInfo,
      numPages: 0, // total number of pages
      pgNumber: props.pgNumber, // ith page
      loadSuccess: false
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.loadDocumentSuccess = this.loadDocumentSuccess.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
  }
  handleFileChange = (e) => {
    alert(this.state.pgNumber);
    this.setState({fileInfo: e.target.files[0]});
  };

  componentDidUpdate(prevProps) {
    if (this.props.fileInfo !== prevProps.fileInfo) {
      this.setState({fileInfo: this.props.fileInfo});
    }
    if (this.props.pgNumber !== prevProps.pgNumber) {
      this.setState({ pgNumber: this.props.pgNumber});
    }
    //alert("Update!!")
  }

  loadDocumentSuccess = ({ numPages }) => {
    this.setState({ numPages });
    this.setState({loadSuccess: true});
  };

  goToNextPage = () => {
    let nextPage = this.state.pgNumber + 1 > this.state.numPages ? 1 : this.state.pgNumber + 1;
    this.setState({pgNumber: nextPage});
  };

  render() {
    const {numPages, pgNumber} = this.state;

    return (
      <Container>
        <br />
        <Header textAlign="center">PDF Preview</Header>
        <Form>
          <input type="file" onChange={this.handleFileChange}>
          </input>
        </Form>
        <Grid centered columns={2}>
          <Grid.Column textAlign="center">

            <Document file={this.state.fileInfo} onLoadSuccess={this.loadDocumentSuccess} noData={<h4>Please select a file</h4>}>
              <Page pageNumber={pgNumber} />
            </Document>

            {this.state.fileInfo? <p>Page {pgNumber} of {numPages}</p> : null}
          </Grid.Column>
        </Grid>
        {
         this.state.loadSuccess? <button onClick={this.goToNextPage}> Next Page</button> : null
        }
      </Container>
    );
  }
}

export default PdfViewer;