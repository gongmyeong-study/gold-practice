import React from "react";
import { connect } from "react-redux";


import MeditationControl from "../MeditationControl/MeditationControl";

type Record = Array<String>;

let meditationRecords: Record = [
  "차를 마시며 명상했어요",
  "숲길을 걸으며 명상했어요",
  "도스토예프스키를 읽으며 명상했어요",
];

interface Props {
  record: string
}

function MeditationList(props: Props) {
  return (
    <div className="meditation_list">
      <h1>MeditationList Component</h1>
      {meditationRecords.map((value) => {
        return <h2>{value}</h2>;
      })}
      <h2>{props.record}</h2>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    record: state.record
  }
}

export default connect(mapStateToProps)(MeditationList);
