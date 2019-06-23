export default class OtherProfile extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    axios
      .get(`/otherprofile/${this.props.match.params.id}`)
      .then(results => {
        if (results.data.usermatch) {
          this.props.history.push('/');
        }

        this.setState({
          bio: results.data.bio,
          first: results.data.first,
          last: results.data.last,
          pic_url: results.data.pic_url
        });
      })
      .catch(err => {
        console.log('error with otherprofile frontend', err);
      });
  }

  render() {
    return (
      <div className="user-box-profile">
        <div className="user-other">
          <ProfilePic
            imageUrl={this.state.pic_url}
            first={this.state.first}
            last={this.state.last}
          />
        </div>
        <div className="bio-box">
          <h1>
            {' '}
            {this.state.first} {this.state.last}{' '}
          </h1>
          <div>{this.state.bio}</div>
        </div>
      </div>
    );
  }
}
