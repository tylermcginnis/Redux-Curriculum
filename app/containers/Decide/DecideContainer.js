import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Decide } from 'components'
import { addAndHandleDecision } from 'redux/modules/users'
import { fetchAndHandleSingleDecision } from 'redux/modules/decisions'

const DecideContainer = React.createClass({
  propTypes: {
    decisionNeedsFetching: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    decision: PropTypes.object.isRequired,
    usersDecision: PropTypes.object,
    onSelect: PropTypes.func.isRequired,
    fetchDecision: PropTypes.func.isRequired,
  },
  componentDidMount () {
    if (this.props.decisionNeedsFetching === true) {
      this.props.fetchDecision()
    }
  },
  render () {
    return <Decide {...this.props} />
  },
})

function mapStateToProps ({decisions, users}, {routeParams}) {
  const decision = decisions.decisions[routeParams.decisionId]

  return {
    isFetching: decisions.isFetching,
    decisionNeedsFetching: typeof decision === 'undefined',
    decision: decision || {},
    usersDecision: users[users.authedId].decisionsMade[routeParams.decisionId],
  }
}

function mapDispatchToProps (dispatch, {routeParams}) {
  return {
    onSelect: (option, switchingDecision) => dispatch(addAndHandleDecision(routeParams.decisionId, option, switchingDecision)),
    fetchDecision: () => dispatch(fetchAndHandleSingleDecision(routeParams.decisionId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DecideContainer)