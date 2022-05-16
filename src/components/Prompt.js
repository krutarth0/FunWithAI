import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { getResponse } from "../api/completion";
import { useResponseDispatch, useResponses } from "../contexts/FunAiProvider";
import Parameters from "./Parameters";

export default function Prompt({ setPromt }) {
  const formRef = useRef(null);
  const prompt = useRef(null);
  const { register, handleSubmit } = useForm();

  const dispatch = useResponseDispatch();
  const appState = useResponses();

  const scanForEnter = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      formRef.current.requestSubmit();
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
            placeholder="Press Enter to  submit, Shift + Enter for new line"
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
