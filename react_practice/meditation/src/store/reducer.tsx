import { act } from "react-dom/test-utils";

interface State {
  records: Array<string>;
}

interface Action {
  type: string;
  value?: string;
  key?: number;
}

const initialState: State = {
  records: ["Genesis Meditation"]
};

const reducer = (state: State = initialState, action: Action) => {
  if (action.type === "WRITE" && action.value !== "") {
    console.log("Writing Medtation");
    console.log(action.value);

    return {
      ...state,
      records: state.records.concat(action.value!)
    }
  }

  if (action.type === "DELETE") {
    // console.log("key To be Delete: ", action.key!, "// Element To be Delete: ", state.records[action.key!], "// records :", state.records )
    // console.log("records.length : ", state.records.length)

    const stateToBeUpdated = state.records.slice(0, action.key!).concat(state.records.slice(action.key!+1));
    // console.log("spliced records: ", stateToBeUpdated);
    return {
      ...state,
      records: stateToBeUpdated
    }
  }

  return state;
};

export default reducer;
