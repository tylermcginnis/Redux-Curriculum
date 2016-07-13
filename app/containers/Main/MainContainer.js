import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import * as userActionCreators from 'redux/modules/users'

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  },
  componentDidMount () {
    this.props.removeFetchingUser()
  },
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default connect(
  ({users}) => ({isAuthed: users.isAuthed}),
  (dispatch) => bindActionCreators(userActionCreators, dispatch)
)(MainContainer)