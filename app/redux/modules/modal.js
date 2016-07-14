import { saveDecision } from 'helpers/api'

const OPEN_MODAL = 'OPEN_MODAL'
const CLOSE_MODAL = 'CLOSE_MODAL'
const UPDATE_DECISION_TEXT = 'UPDATE_DECISION_TEXT'

export function openModal () {
  return {
    type: OPEN_MODAL,
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL,
  }
}

export function updateDecisionText (decisionType, decisionText) {
  return {
    type: UPDATE_DECISION_TEXT,
    decisionType,
    decisionText,
  }
}

export function saveAndCloseModal (decision) {
  return function (dispatch) {
    saveDecision(decision)
      .then(() => dispatch(closeModal()))
      .catch((error) => console.warn('Error saving decision', error))
  }
}

const initialState = {
  firstDecisionText: '',
  secondDecisionText: '',
  titleText: '',
  isOpen: false,
}

export default function modal (state = initialState, action) {
  switch (action.type) {
    case OPEN_MODAL :
      return {
        ...state,
        isOpen: true,
      }
    case CLOSE_MODAL :
      return initialState
    case UPDATE_DECISION_TEXT :
      return {
        ...state,
        [action.decisionType]: action.decisionText,
      }
    default :
      return state
  }
}
