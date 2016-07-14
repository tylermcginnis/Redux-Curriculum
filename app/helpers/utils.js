import { decisionsExpirationLength } from 'config/constants'

export function formatUserInfo (name, avatar, uid) {
  return {
    name,
    avatar,
    uid,
  }
}

export function formatDecision (title, firstDecisionText, secondDecisionText, user) {
  return {
    timestamp: Date.now(),
    author: user,
    title,
    firstOption: {
      text: firstDecisionText,
      selectedCount: 0,
    },
    secondOption: {
      text: secondDecisionText,
      selectedCount: 0,
    }
  }
}

export function formatTimestamp (timestamp) {
  const date = new Date(timestamp)
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function getMilliseconds (timestamp) {
  return new Date().getTime() - new Date(timestamp).getTime()
}

export function decisionsAreStale (timestamp) {
  return getMilliseconds(timestamp) > decisionsExpirationLength
}