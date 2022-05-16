import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { getResponse } from "../api/completion";
import { useResponseDispatch, useResponses } from "../contexts/FunAiProvider";
import Parameters from "./Parameters";

export default function Prompt({ setPromt }) {
  const formRef = useRef(null);
  const prompt = useRef(null);
  const { register, handleSubmit, setValue } = useForm();

  const dispatch = useResponseDispatch();
  const appState = useResponses();

  const scanForEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      formRef.current.requestSubmit();
    }

    console.log(e.keyCode);
    if (e.keyCode === 40 && e.shiftKey === true) {
      dispatch({
        type: "customizing",
        customization: {
          max_tokens: 60,
          temperature: 0,
          model: "text-davinci-002",
        },
      });
      setValue(
        "GPTprompt",
        "Correct this to standard English:\n\nShe no went to the market."
      );
    }
  };

  const onSubmit = (formData) => {
    getResponse(dispatch, {
      formData: formData,
      max_tokens: appState.customization.max_tokens,
      temperature: appState.customization.temperature,
      engine_id: appState.customization.model,
    });
  };

  return (
    <section className="Input-bar">
      <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
        <div className="Input-text-wrapper">
          <label htmlFor="GPTprompt">Enter prompt</label>
          <textarea
            ref={prompt}
            placeholder="🗣️ Press Enter to submit, Shift + Enter for new line
🚀 You can also try a preset by using shift + down arrow, at this moment only supported for desktop :( "
            cols="50"
            {...register("GPTprompt")}
            required
            onKeyDown={(e) => scanForEnter(e)}
          ></textarea>
          <div className="Submit-input-wrapper">
            <Parameters />
            <button type="submit"> Submit </button>
            {/* <button
              onClick={() => {
                setValue(
                  "GPTprompt",
                  `${getValues("GPTprompt")}\nempy\nempy2\n`
                );
                setFocus("GPTprompt");
              }}
            >
              {" "}
            </button> */}
          </div>
        </div>
      </form>
    </section>
  );
}
