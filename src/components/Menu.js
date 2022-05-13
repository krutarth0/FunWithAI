import React, { useState, useRef } from "react";
import { useResponseDispatch, useResponses } from "../contexts/FunAiProvider";

export default function Menu() {
  //   console.log(model, ":", temprature, ":", max_tokens);
  const dispatch = useResponseDispatch();
  const appState = useResponses();

  const [model, setModel] = useState(appState.customization.model);
  const [temprature, setTemprature] = useState(
    appState.customization.temperature
  );
  const [max_tokens, setMax_tokens] = useState(
    appState.customization.max_tokens
  );

  const handleChange = (userinput) => {
    var customizer = {
      temperature: temprature,
      max_tokens: max_tokens,
      model: model,
    };
    if (userinput.target && userinput.target.name === "tokens") {
      if (userinput.target.value >= 2048) {
        customizer.max_tokens = 2048;
        setMax_tokens(2048);
      } else {
        customizer.max_tokens = userinput.target.value;
        setMax_tokens(userinput.target.value);
      }
    }

    if (userinput.target && userinput.target.name === "Temprature") {
      customizer.temperature = userinput.target.value / 100;
      setTemprature(userinput.target.value / 100);
    }
    if (userinput === "text-davinci-002") {
      customizer.model = "text-davinci-002";
      setModel("text-davinci-002");
    }
    if (userinput === "text-cuire-001") {
      customizer.model = "text-cuire-001";
      setModel("text-cuire-001");
    }
    if (userinput === "text-ada-001") {
      customizer.model = "text-ada-001";
      setModel("text-ada-001");
    }

    // console.log(dispatch);

    dispatch({
      type: "customizing",
      customization: customizer,
    });
  };

  return (
    <ul className="Menu">
      <li>
        <div className="Menu-item">
          <label htmlFor="Temprature">Temprature</label>
          <p>{temprature}</p>
        </div>
        <input
          type="range"
          id="Temprature"
          name="Temprature"
          min="0"
          max="100"
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li>
        <div className="Menu-item">
          <label htmlFor="max_tokens">max_tokens</label>
          <p>{max_tokens}</p>
        </div>
        <input
          type="number"
          name="tokens"
          id="max_tokens"
          max="2048"
          value={max_tokens}
          onChange={(e) => handleChange(e)}
        />
      </li>
      <li>
        <div className="Menu-item">
          <label>model</label>
        </div>
        <p>{model}</p>
        <ul>
          <li onClick={() => handleChange("text-davinci-002")}>
            text-davinci-002
          </li>
          <li onClick={() => handleChange("text-cuire-001")}>text-cuire-001</li>
          <li onClick={() => handleChange("text-ada-001")}>text-ada-001</li>
        </ul>
      </li>
    </ul>
  );
}
