{
  users: {
    isAuthed,
    isFetching,
    error,
    authedId,
    [uid]: {
      lastUpdated,
      info: {
        name,
        uid,
        avatar,
      },
      decisionsMade: [decisionId, decisionId],
    }
  },
  remainingDecisions: [decisionId, decisionId],
  decesions: {
    lastUpdated: 0,
    isFetching: true,
    error: '',
    decesions: {
      [decisionId]: {
        author,
        timestamp,
        firstOption
          text
          selectedCount
        secondOption
          text
          selectedCount
      }
    }
  },
  listeners: {
    [listenersId]: true
  },
}