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