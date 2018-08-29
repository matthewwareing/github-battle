import React from 'react'
import PropTypes from 'prop-types'

export function PlayerPreview ({ username, avatar, children }) {
  return (
    <div>
      <div className="column">
        <img 
        src={avatar}
        alt={'Avatar for ' + username}
        className='avatar'
        />
        <h2 className="username">@{username}</h2>
      </div>
      {children}
    </div>
  )
}

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
}
