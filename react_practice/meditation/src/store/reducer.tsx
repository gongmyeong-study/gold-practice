interface State {
  counter: number,
  username?: string
}

interface Action {
  type: string,
  value: number
}

const initialState: State = {
  counter: 0,
  username: undefined
}

const reducer = (state: State = initialState , action: Action) => {
  return state
}

export default reducer;