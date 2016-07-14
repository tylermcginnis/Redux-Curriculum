import { ref } from 'config/constants'

export function saveDecision (decision) {
  const decisionId = ref.child('decisions').push().key
  return ref.child(`decisions/${decisionId}`).set({...decision, decisionId})
}