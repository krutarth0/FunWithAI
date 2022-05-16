import React from "react";

import { useResponseDispatch, useResponses } from "../contexts/FunAiProvider";
import Iclose from "./Icons/Iclose";

export default function Response({ prompt }) {
  const dispatch = useResponseDispatch();
  const appState = useResponses();

  const reomveResponse = (createdAt) => {
    dispatch({
      type: "remove-fetched",
      created: createdAt,
    });
  };

  //just to animate the "top push down effect" on the list
  //using only css, instead of injecting jquery or other libraries
  const first_li = appState.responses[0] ? appState.responses[0] : null;
  const rest_li =
    appState.responses.length > 1 ? appState.responses.slice(1) : null;

  return (
    <section className="Response-bar">
      <div className="Response-bar-heading">
        <h4>Responses</h4>
        <div
          className={`${appState.process === "fetching" ? "dot-typing" : ""} `}
        ></div>
      </div>

      <ul className={`${appState.process === "fetched" ? "move-down" : ""}`}>
        {first_li ? (
          <li
            className={`${
              appState.process === "fetched" ? "comin-in-hot" : ""
            }`}
          >
            <div className="Response">
              <div className="Prompt">
                <p>Prompt</p>
                <p id="PromptText">{first_li.text}</p>
              </div>
              <div className="Response-text">
                <p>Response</p>
                {first_li.data.error !== undefined ? (
                  <p id="PromptText">error : {first_li.data.error.message}</p>
                ) : (
                  <p id="PromptText">{first_li.data.choices[0].text}</p>
                )}
                {/* <p id="PromptText">{first_li.data.choices[0].text}</p> */}
              </div>
              <Iclose
                height={20}
                width={20}
                onClick={() => reomveResponse(first_li.data.created)}
              ></Iclose>
            </div>
          </li>
        ) : null}
        {rest_li
          ? rest_li.map((res, key) => (
              <li key={key}>
                <div className="Response">
                  <div className="Prompt">
                    <p>Prompt </p>
                    <p id="PromptText">{res.text}</p>
                  </div>
                  <div className="Response-text">
                    <p>Response </p>
                    {res.data.error !== undefined ? (
                      <p id="PromptText">error : {res.data.error.message}</p>
                    ) : (
                      <p id="PromptText">{res.data.choices[0].text}</p>
                    )}
                    {/* <p id="PromptText">{res.data.choices[0].text}</p> */}
                  </div>
                  <Iclose
                    height={20}
                    width={20}
                    onClick={() => reomveResponse(res.data.created)}
                  ></Iclose>
                </div>
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}
