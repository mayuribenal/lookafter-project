import React from 'react';
import axios from './axios';
import { setFamilyBio, openFamilyBioEditor } from './actions';
import { connect } from 'react-redux';

class BioFamily extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleInput = this.handleInput.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleInput({ target }) {
    this.setState({
      familybio: target.value
    });
  }

  openBioEditor() {
    this.setState({
      bioEditorIsVisible: true
    });
  }

  submit() {
    axios
      .post('/profile-family', { familybio: this.state.description })
      .then(results => {
        console.log('MY PROF RESULTS', results);
        this.props.dispatch(setFamilyBio(this.state.description));
        this.props.dispatch(openFamilyBioEditor());
      })
      .catch(err => {
        console.log('profile family bioeditor ', err);
      });
  }

  render() {
    return (
      <div>
        {this.props.description && !this.props.openFamilyBioEditor && (
          <div className="bioeditor">
            <div className="props-box">{this.props.description}</div>
            <div>
              <button
                onClick={() => this.props.dispatch(openFamilyBioEditor())}
              >
                edit
              </button>
            </div>
          </div>
        )}
        {!this.props.description && !this.props.openFamilyBioEditor && (
          <div>
            <button onClick={() => this.props.dispatch(openFamilyBioEditor())}>
              {' '}
              add description
            </button>
          </div>
        )}
        {this.props.openFamilyBioEditor && (
          <div className="bioeditor">
            <div>
              <p>your family member description:</p>
            </div>
            <div className="props-box">
              <textarea
                defaultValue={this.props.description}
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
    openFamilyBioEditor: state.openFamilyBioEditor
  };
};

export default connect(mapStateToProps)(BioFamily);

// this.setState({
//   bioEditorIsVisible: false
// });
