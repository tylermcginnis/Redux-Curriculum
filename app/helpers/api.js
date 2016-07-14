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