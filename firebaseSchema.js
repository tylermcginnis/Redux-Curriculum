/users
  uid
    info
      name
      uid
      avatar
    decisionsMade
      decisionId
        chosen (firstOption || secondOption)
        text

/decisions
  id
    decisionId
    timestamp
    title
    author
      name
      avatar
      uid
    firstOption
      text
      selectedCount
    secondOption
      text
      selectedCount