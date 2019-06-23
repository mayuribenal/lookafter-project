import React from 'react';
import { connect } from 'react-redux';
import { setUploaderVisible, setProfilePic } from './actions';
import axios from './axios';

class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: 'Select a photo'
    };
    this.uploadFile = this.uploadFile.bind(this);
    this.changeLabel = this.changeLabel.bind(this);
  }
  uploadFile() {
    var file = document.getElementById('file');
    var uploadedFile = file.files[0];
    var formData = new FormData();
    formData.append('file', uploadedFile);
    axios.post('/upload', formData).then(({ data }) => {
      console.log('UPLOADER DATA:', data);
      this.props.dispatch(setProfilePic(data.pic));
      this.props.dispatch(setUploaderVisible());
    });
  }
  changeLabel(e) {
    this.setState({
      fileName: e.target.files[0].name
    });
  }
  render() {
    return (
      <div
        onClick={() => this.props.dispatch(setUploaderVisible())}
        className="uploader"
      >
        <input
          id="file"
          type="file"
          onChange={this.changeLabel}
          accept="image/*"
        />
        <label htmlFor="file">{this.state.fileName}</label>
        <button onClick={this.uploadFile}>upload</button>
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    uploaderVisible: state.uploaderVisible
  };
};

export default connect(mapStateToProps)(Uploader);
