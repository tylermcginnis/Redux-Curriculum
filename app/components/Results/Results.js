import React, { PropTypes } from 'react'
import { decisionContainer, title, decisionFooter, icon, header } from './styles.css'
import { formatTimestamp } from 'helpers/utils'
import { Spinner } from 'components'

import Open from 'react-icons/lib/io/ios-circle-outline'
import Checked from 'react-icons/lib/io/ios-checkmark-outline'

Results.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  decisions: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  decisionsMade: PropTypes.object.isRequired,
  onToDecide: PropTypes.func.isRequired,
}

export default function Results (props) {
  if (props.isFetching === true) {
    return <Spinner />
  }

  return (
    <div>
      <h2 className={header}>Decisions</h2>
      {props.decisions.length === 0
        ? <div style={{textAlign: 'center'}}>No Results</div>
        : null}
      {props.error ? <div>{props.error} </div> : null}
      {props.decisions.map((decision) => {
        const id = decision.decisionId
        return (
         <div
          className={decisionContainer}
          style={{borderLeftColor: props.decisionsMade[id] ? '#66C8EB': '#E73130'}}
          key={id}
          onClick={() => props.onToDecide(id)}>
            <div>
              <div className={title}>{decision.title}</div>
              <div>
                <span>{formatTimestamp(decision.timestamp)} by {decision.author.name}</span>
              </div>
            </div>
            <div>
              {props.decisionsMade[id] ? <Checked className={icon} /> : <Open className={icon} />}
            </div>
         </div>
        )
      })}
    </div>
  )
}
