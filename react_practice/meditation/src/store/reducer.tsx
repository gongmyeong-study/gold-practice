interface State {
  records: Array<string>
}

interface Action {
  type: string,
  value: number
}

const initialState: State = {
  records: ["Genesis Meditation", "차를 마시며 명상했어요", "숲길을 걸으며 명상했어요", "도스토예프스키를 읽으며 명상했어요"]
}

const reducer = (state: State = initialState , action: Action) => {
  return state
}

export default reducer;