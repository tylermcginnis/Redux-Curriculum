import auth, { logout, saveUser } from 'helpers/auth'
import { formatUserInfo } from 'helpers/utils'
import { fetchUser, fetchUsersMadeDecisions, addDecisionToUser, incrementSelectedCount, decrementSelectedCount } from 'helpers/api'

const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'
const FETCHING_USER = 'FETCHING_USER'
const FETCHING_USER_FAILURE = 'FETCHING_USER_FAILURE'
const FETCHING_USER_SUCCESS = 'FETCHING_USER_SUCCESS'
const REMOVE_FETCHING_USER = 'REMOVE_FETCHING_USER'
const ADD_USER = 'ADD_USER'
const ADD_USERS_MADE_DECISIONS = 'ADD_USERS_MADE_DECISIONS'
const ADD_USER_DECISION = 'ADD_USER_DECISION'

export function addUser (user) {
  return {
    type: ADD_USER,
    user,
    lastUpdated: Date.now(),
  }
}

export function authUser (uid) {
  return {
    type: AUTH_USER,
    uid,
  }
}

function unauthUser () {
  return {
    type: UNAUTH_USER,
  }
}

function fetchingUser () {
  return {
    type: FETCHING_USER,
  }
}

function fetchingUserFailure (error) {
  return {
    type: FETCHING_USER_FAILURE,
    error: 'Error fetching user.',
  }
}

export function addUsersMadeDecisions (uid, decisions) {
  return {
    type: ADD_USERS_MADE_DECISIONS,
    uid,
    decisions,
  }
}

export function fetchAndAddUsersMadeDecisions (uid) {
  return function (dispatch) {
    return fetchUsersMadeDecisions(uid)
      .then((madeDecisions) => dispatch(addUsersMadeDecisions(uid, madeDecisions)))
      .catch((err) => console.warn(err))
  }
}

export function fetchingUserSuccess (uid, user, timestamp) {
  return {
    type: FETCHING_USER_SUCCESS,
    uid,
    user,
    timestamp,
  }
}

export function removeFetchingUser () {
  return {
    type: REMOVE_FETCHING_USER
  }
}

export function fetchAndHandleAuthedUser () {
  return function (dispatch) {
    dispatch(fetchingUser())
    return auth().then(({user, credential}) => {
      const userData = user.providerData[0]
      const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
      return dispatch(fetchAndAddUsersMadeDecisions(user.uid))
        .then(() => dispatch(fetchingUserSuccess(user.uid, userInfo, Date.now())))
    })
    .then(({user}) => saveUser(user))
    .then((user) => dispatch(authUser(user.uid)))
    .catch((error) => dispatch(fetchingUserFailure(error)))
  }
}

function addUserDecision (uid, decisionId, decisionData) {
  return {
    type: ADD_USER_DECISION,
    uid,
    decisionId,
    decisionData,
  }
}

export function addAndHandleDecision (decisionId, option, switchingDecision) {
  return function (dispatch, getState) {
    const { users, decisions } = getState()
    const decision = decisions.decisions[decisionId]
    const decisionData = {
      chosen: option,
      text: decision[option].text,
    }

    return addDecisionToUser(users.authedId, decisionId, decisionData)
      .then(() => decrementSelectedCount(decisionId, option === 'firstOption' ? 'secondOption' : 'firstOption'))
      .then(() => incrementSelectedCount(decisionId, option))
      .then(() => dispatch(addUserDecision(users.authedId, decisionId, decisionData)))
      .catch((error) => console.warn('Error adding decision', error))
  }
}

export function logoutAndUnauth () {
  return function (dispatch) {
    logout()
    dispatch(unauthUser())
  }
}

const initialUserState = {
  lastUpdated: 0,
  info: {
    name: '',
    uid: '',
    avatar: '',
  },
  decisionsMade: {},
}

function user (state = initialUserState, action) {
  switch (action.type) {
    case FETCHING_USER_SUCCESS :
      return {
        ...state,
        info: action.user,
        lastUpdated: action.timestamp,
      }
    default :
      return state
  }
}

const initialState = {
  isFetching: true,
  error: '',
  isAuthed: false,
  authedId: ''
}

export default function users (state = initialState, action) {
  switch (action.type) {
    case AUTH_USER :
      return {
        ...state,
        isAuthed: true,
        authedId: action.uid,
      }
    case UNAUTH_USER :
      return {
        ...state,
        isAuthed: false,
        authedId: '',
      }
    case FETCHING_USER :
      return {
        ...state,
        isFetching: true,
      }
    case FETCHING_USER_FAILURE :
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    case FETCHING_USER_SUCCESS :
      return action.user === null
        ? {
          ...state,
          error: '',
          isFetching: false,
        }
        : {
          ...state,
          isFetching: false,
          error: '',
          [action.uid]: user(state[action.uid], action)
        }
    case REMOVE_FETCHING_USER :
      return {
        ...state,
        isFetching: false,
      }
    case ADD_USERS_MADE_DECISIONS :
      return {
        ...state,
        [action.uid]: {
          ...state[action.uid],
          decisionsMade: action.decisions,
        }
      }
    case ADD_USER :
      return typeof state[action.user.uid] !== 'undefined'
        ? state
        : {
          ...state,
          [action.user.uid]: {
            ...state[action.user.uid],
            lastUpdated: action.lastUpdated,
            info: action.user,
          },
        }
    case ADD_USER_DECISION :
      return {
        ...state,
        [action.uid]: {
          ...state[action.uid],
          decisionsMade: {
            ...state[action.uid].decisionsMade,
            [action.decisionId]: action.decisionData,
          }
        }
      }
    default :
      return state
  }
}