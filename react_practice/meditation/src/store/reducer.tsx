interface State {
  records: Array<string>;
}

interface Action {
  type: string;
  value: string;
}

const initialState: State = {
  records: ["Genesis Meditation"],
};

const reducer = (state: State = initialState, action: Action) => {
  if (action.type === "WRITE") {
    console.log("Writing Medtation");
    console.log(action.value);
    return {
      ...state,
      records: [action.value],
    };
  }

  return state;
};

export default reducer;
