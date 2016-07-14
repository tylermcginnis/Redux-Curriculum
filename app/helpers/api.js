import { ref } from 'config/constants'

export function saveDecision (decision) {
  const decisionId = ref.child('decisions').push().key
  return ref.child(`decisions/${decisionId}`).set({...decision, decisionId})
}

export function listenToDecisions (cb, error) {
  return ref.child('decisions').on('value', (snapshot) => {
    return cb(snapshot.val() || {})
  }, error)
}

export function fetchSingleDecision (decisionId) {
  return ref.child(`decisions/${decisionId}`)
    .once('value')
    .then((snapshot) => snapshot.val() || {})
}

export function fetchUsersMadeDecisions (uid) {
  return ref.child(`users/${uid}/decisionsMade`)
    .once('value')
    .then((snapshot) => snapshot.val() || {})
    .catch((err) => console.warn('Error fetching decisions', err))
}

export function fetchUser (uid) {
  return ref.child(`users/${uid}`).once('value')
    .then((snapshot) => snapshot.val())
}

export function addDecisionToUser (uid, decisionId, data) {
  return ref.child(`users/${uid}/decisionsMade/${decisionId}`)
    .set(data)
}

export function incrementSelectedCount (decisionId, option) {
  return ref.child(`decisions/${decisionId}/${option}/selectedCount`)
    .transaction((currentValue = 0) => currentValue + 1)
}

export function decrementSelectedCount (decisionId, option) {
  return ref.child(`decisions/${decisionId}/${option}/selectedCount`)
    .transaction((currentValue = 0) => currentValue <= 0 ? 0 : currentValue - 1)
}