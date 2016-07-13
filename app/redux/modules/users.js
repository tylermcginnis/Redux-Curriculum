const AUTH_USER = 'AUTH_USER'
const UNAUTH_USER = 'UNAUTH_USER'

function authUser (uid) {
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
    default :
      return state
  }
}