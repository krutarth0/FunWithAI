import React from "react";
import { useResponses } from "../contexts/FunAiProvider";

export default function Parameters() {
  const appState = useResponses();
  return (
    <div className="Parameters">
      <div className="Parameters-item">
        <p>Temprature :</p>
        <b>{appState.customization.temperature}</b>
      </div>

      <div className="Parameters-item">
        <p>max_tokens :</p>
        <b>{appState.customization.max_tokens}</b>
      </div>
      <div className="Parameters-item">
        <p>model :</p>
        <b>{appState.customization.model}</b>
      </div>
    </div>
  );
}
