import React, { Dispatch } from "react";
import { connect } from "react-redux";

interface Props {
  records: Array<string>;
  delete: (key: number) => void;
}

function MeditationList(props: Props) {
  return (
    <div className="meditation_list">
      <h1>MeditationList Component</h1>

      {props.records.map((value, key) => {
        return (
          <div>
            <h2 key={key}>{value}</h2>
            <button onClick={() => props.delete(key)}></button>
          </div>
        );
      })}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    records: state.records,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    delete: (key: number) => dispatch({ type: "DELETE", key: key }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MeditationList);
