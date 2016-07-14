import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { Results } from 'components'
import { setAndHandleDecisionsListener } from 'redux/modules/decisions'
import { decisionsAreStale } from 'helpers/utils'

const ResultsContainer = React.createClass({
  propTypes: {
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    decisions: PropTypes.array.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    decisionsMade: PropTypes.object.isRequired,
    setAndHandleDecisionsListener: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    if (decisionsAreStale(this.props.lastUpdated)) {
      this.props.setAndHandleDecisionsListener()
    }
  },
  handleToDecide (decisionId) {
    this.context.router.push('/decide/' + decisionId)
  },
  render () {
    return (
      <Results
        isFetching={this.props.isFetching}
        error={this.props.error}
        decisionsMade={this.props.decisionsMade}
        decisions={this.props.decisions}
        onToDecide={this.handleToDecide} />
    )
  },
})

function mapStateToProps ({decisions, users}) {
  const decs = decisions.decisions
  return {
    decisionsMade: users[users.authedId].decisionsMade,
    isFetching: decisions.isFetching,
    lastUpdated: decisions.lastUpdated,
    decisions: Object.keys(decs)
      .sort((a,b) => decs[b].timestamp - decs[a].timestamp)
      .map((id) => decs[id]),
    error: decisions.error,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setAndHandleDecisionsListener: () => dispatch(setAndHandleDecisionsListener())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResultsContainer)