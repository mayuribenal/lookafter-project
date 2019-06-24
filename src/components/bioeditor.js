import React from 'react';
import axios from './axios';
import { setBio, openBioEditor } from './actions';
import { connect } from 'react-redux';

class BioEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInput = this.handleInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInput({ target }) {
    this.setState({
      bio: target.value
    });
  }

  openBioEditor() {
    this.setState({
      bioEditorIsVisible: true
    });
  }

  submit() {
    console.log('my setBio', setBio);
    axios
      .post('/profile', { bio: this.state.bio })
      .then(results => {
        // console.log('MY PROF RESULTS', results);
        this.props.dispatch(setBio(this.state.bio));
        this.props.dispatch(openBioEditor());
      })
      .catch(err => {
        console.log('profile bioeditor ', err);
      });
  }

  render() {
    return (
      <div>
        {this.props.bio && !this.props.openBioEditor && (
          <div className="bioeditor">
            <div className="props-box">{this.props.bio}</div>
            <div>
              <button onClick={() => this.props.dispatch(openBioEditor())}>
                edit
              </button>
            </div>
          </div>
        )}
        {!this.props.bio && !this.props.openBioEditor && (
          <div>
            <button onClick={() => this.props.dispatch(openBioEditor())}>
              {' '}
              add bio
            </button>
          </div>
        )}
        {this.props.openBioEditor && (
          <div className="bioeditor">
            <div>
              <p>your bio:</p>
            </div>
            <div className="props-box">
              <textarea
                defaultValue={this.props.bio}
                onChange={this.handleInput}
              />
            </div>
            <div>
              <button type="submit" onClick={this.submit}>
                save
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    openBioEditor: state.openBioEditor,
    bio: state.user && state.user.bio
  };
};

export default connect(mapStateToProps)(BioEditor);

// this.setState({
//   bioEditorIsVisible: false
// });
