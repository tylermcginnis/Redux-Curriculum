import { listenToDecisions, fetchSingleDecision } from 'helpers/api'
import { addListener } from 'redux/modules/listeners'
import { addUser } from 'redux/modules/users'

const SETTINGS_DECISIONS_LISTENER = 'SETTINGS_DECISIONS_LISTENER'
const SETTINGS_DECISIONS_LISTENER_ERROR = 'SETTINGS_DECISIONS_LISTENER_ERROR'
const SETTINGS_DECISIONS_LISTENER_SUCCESS = 'SETTINGS_DECISIONS_LISTENER_SUCCESS'
const ADD_DECISION = 'ADD_DECISION'

function settingDecisionsListener () {
  return {
    type: SETTINGS_DECISIONS_LISTENER,
  }
}

function settingDecisionsListenerError (error) {
  return {
    type: SETTINGS_DECISIONS_LISTENER_ERROR,
    error: 'Error fetching Decisions',
  }
}

function settingDecisionsListenerSuccess (data) {
  return {
    type: SETTINGS_DECISIONS_LISTENER_SUCCESS,
    data,
    timestamp: Date.now(),
  }
}

export function setAndHandleDecisionsListener () {
  return function (dispatch, getState) {
    if (getState().listeners.decisions === true) {
      return
    }

    dispatch(addListener('decisions'))
    dispatch(settingDecisionsListener())

    listenToDecisions((decisions) => {
      dispatch(settingDecisionsListenerSuccess(decisions))
      Object.keys(decisions).map((decisionId) => dispatch(addUser(decisions[decisionId].author)))
    }, (error) => dispatch(settingDecisionsListenerError(error)))
  }
}

function addDecision (decisionId, decision) {
  return {
    type: ADD_DECISION,
    decisionId,
    decision,
  }
}

export function fetchAndHandleSingleDecision (decisionId) {
  return function (dispatch) {
    fetchSingleDecision(decisionId)
      .then((decision) => dispatch(addDecision(decisionId, decision)))
      .catch((error) => console.warn('Error fetching decision', error))
  }
}

const initialState = {
  lastUpdated: 0,
  isFetching: true,
  error: '',
  decisions: {},
}

export default function decisions (state = initialState, action) {
  switch (action.type) {
    case SETTINGS_DECISIONS_LISTENER :
      return {
        ...state,
        isFetching: true,
      }
    case SETTINGS_DECISIONS_LISTENER_ERROR :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case SETTINGS_DECISIONS_LISTENER_SUCCESS :
      return {
        ...state,
        lastUpdated: action.timestamp || state.lastUpdated,
        isFetching: false,
        error: '',
        decisions: {
          ...state.decisions,
         ...action.data,
        },
      }
    case ADD_DECISION :
      return {
        ...state,
        isFetching: false,
        decisions: {
          ...state.decisions,
          [action.decisionId]: action.decision,
        },
      }
    default :
      return state
  }
}