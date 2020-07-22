import React from "react";
import { connect } from "react-redux";

interface Props {
  records: Array<string>
}

function MeditationList(props: Props) {
  return (
    <div className="meditation_list">
      <h1>MeditationList Component</h1>
      {props.records.map((value) => {
        return <h2>{value}</h2>;
      })}
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    records: state.records
  }
}

export default connect(mapStateToProps)(MeditationList);
