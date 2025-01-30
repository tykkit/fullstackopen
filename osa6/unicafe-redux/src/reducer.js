const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGood = state.good + 1
      return {
        ...state,
        good: newGood
      }
    case 'OK':
      const okValue = state.ok + 1
      return {
        ...state,
        ok: okValue
      }
    case 'BAD':
      const badValue = state.bad + 1
      return {
        ...state,
        bad: badValue
      }
    case 'ZERO':
      return {
        good: 0,
        ok: 0,
        bad: 0
      }
    default: return state
  }
  
}

export default counterReducer
