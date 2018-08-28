import React from "react"
import queryString from "query-string"
import api from "../utils/api"
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import { PlayerPreview } from './PlayerPreview'

function Profile(props) {
  const info = props.info
  return (
    <PlayerPreview username={info.login} avatar={info.avatar_url}>
    <ul className='space-list-items'>
        {info.name && <li>{info.name}</li>}
        {info.location && <li>{info.location}</li>}
        {info.company && <li>{info.company}</li>}
        <li>Followers: {info.followers}</li>
        <li>Following: {info.following}</li>
        <li>Public Repos: {info.public_repos}</li>
        {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
      </ul>
    </PlayerPreview>
  )
}

function Player(props) {
  return (
    <div>
        <h1 className='header'>{props.label}</h1>
        <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
        <Profile info={props.profile}/>
      </div>
  );
}

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired,
}

export default class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    };
  }
  componentDidMount() {
    const players = queryString.parse(this.props.location.search);
    api.battle([players.playerOneName, players.playerTwoName]).then(results => {
      if (results === null) {
        this.setState({
          error:
            "Looks like there was an error. Please check both users are on Github!",
          loading: false
        });
      }

      this.setState({
        winner: results[0],
        loser: results[1],
        loading: false,
        error: null
      });
    });
  }

  render() {
    let error = this.state.error
    let loading = this.state.loading
    let winner = this.state.winner
    let loser = this.state.loser
    
    if (loading === true) {
      return <p>Loading...</p>;
    }

    if (error === true) {
      return ( 
        <div>
          <p>{error}</p>
          <Link to='/battle'>Reset</Link>
        </div>
      )}

    return (
      <div className="row">
        {winner !== null && <Player
            profile={winner.profile}
            score={winner.score}
            label='Winner'
          />}
        {loser !== null && <Player
            profile={loser.profile}
            score={loser.score}
            label='Loser'
          />}
      </div>
    );
  }
}
