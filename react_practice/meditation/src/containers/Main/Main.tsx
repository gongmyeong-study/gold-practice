import React from "react";

import "./Main.css";
import { MeditationList, MeditationControl } from "../../components/index";

function Main() {
  return (
    <div className="Main">
      <h1>Main Container</h1>
      <MeditationControl />
      <MeditationList />
    </div>
  );
}

export default Main;
