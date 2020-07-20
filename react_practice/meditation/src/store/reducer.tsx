interface State {
  record: string
}

interface Action {
  type: string,
  value: number
}

const initialState: State = {
  record: "Genesis Meditation"
}

const reducer = (state: State = initialState , action: Action) => {
  return state
}

export default reducer;