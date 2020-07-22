import React, { Dispatch, useState } from "react";
import { connect } from "react-redux";

interface Writing {
  writer: string;
  content: string;
}

interface Props {
  meditationWriting: (value: string) => void;
}

function MeditationControl(props: Props) {
  const [text, setText] = useState("");

  return (
    <div>
      <h1>MeditationControl Component</h1>
      <label>
        Essay:
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </label>
      <button onClick={() => props.meditationWriting(text)}></button>
    </div>
  );
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => {
  return {
    meditationWriting: (value: string) =>
      dispatch({ type: "WRITE", value: value }),
  };
};

export default connect(null, mapDispatchToProps)(MeditationControl);
