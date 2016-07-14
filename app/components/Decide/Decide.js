import React, { PropTypes } from 'react'
import { cardContainer, container, or, decisionText, percentage, agree, decisionTextAnswered, icon } from './styles.css'
import { header } from 'sharedStyles/styles.css'
import Checked from 'react-icons/lib/io/ios-checkmark-outline'
import { Spinner } from 'components'

Card.propTypes = {
  chosen: PropTypes.bool.isRequired,
  showResult: PropTypes.bool.isRequired,
  decision: PropTypes.shape({
    selectedCount: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }),
  percentage: PropTypes.number.isRequired,
  cardType: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
}

function getPercentageColor (type) {
  return type === 'first'
    ? {color: '#267ea0', textShadow: '0 1px 2px rgba(255,255,255,0.5)'}
    : {color: '#7e0b0b', textShawdow: '0 1px 2px rgba(255,255,255,0.5)'}
}

function Card (props) {
  return (
    <div
      onClick={props.onSelect}
      className={cardContainer}
      style={{backgroundColor: props.cardType === 'first' ? '#66C8EB': '#E73130'}}>
        {props.showResult === true
          ? <div>
              {props.chosen === true ? <Checked className={icon} /> : null}
              <div className={percentage} style={getPercentageColor(props.cardType)}>{props.percentage}%</div>
              <div className={agree}>{props.decision.selectedCount} {props.chosen === true ? props.decision.selectedCount === 1 ? 'agrees' : 'agree' : 'disagree'}</div>
              <div className={decisionTextAnswered} style={{fontSize: props.showResult === true ? 15 : 25}}>{props.decision.text}</div>
            </div>
          : <div className={decisionText}>{props.decision.text}</div>}
    </div>
  )
}

Decide.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  decision: PropTypes.shape({
    author: PropTypes.object,
    decisionId: PropTypes.string,
    firstOption: PropTypes.shape({
      selectedCount: PropTypes.number,
      text: PropTypes.string,
    }),
    secondOption: PropTypes.shape({
      selectedCount: PropTypes.number,
      text: PropTypes.string,
    }),
    timestamp: PropTypes.number,
  }).isRequired,
  usersDecision: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
}

export default function Decide ({usersDecision, decision, onSelect, isFetching}) {
  if (isFetching === true) {
    return <Spinner />
  }

  const totalCount = decision.firstOption.selectedCount + decision.secondOption.selectedCount
  const noDecisionMade = typeof usersDecision === 'undefined'

  return (
    <div>
      <h2 className={header}>Would you rather...</h2>
      <div className={container}>
        <div className={or}><span>or</span></div>
        <Card
          cardType='first'
          chosen={noDecisionMade ? false : usersDecision.chosen === 'firstOption'}
          showResult={!noDecisionMade}
          decision={decision.firstOption}
          percentage={totalCount === 0 ? 0 : parseInt(decision.firstOption.selectedCount / totalCount * 100)}
          onSelect={() => usersDecision && usersDecision.chosen === 'firstOption' ? null : onSelect('firstOption', !noDecisionMade)} />
        <Card
          cardType='second'
          chosen={noDecisionMade ? false : usersDecision.chosen === 'secondOption'}
          showResult={!noDecisionMade}
          decision={decision.secondOption}
          percentage={totalCount === 0 ? 0 : parseInt(decision.secondOption.selectedCount / totalCount * 100)}
          onSelect={() => usersDecision && usersDecision.chosen === 'secondOption' ? null : onSelect('secondOption', !noDecisionMade)} />
      </div>
    </div>
  )
}
