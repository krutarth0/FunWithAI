import React from "react";
import { createContext, useContext, useReducer } from "react";

const FunAicontext = createContext(null);
const FunAiDispatchContext = createContext(null);

export default function FunAiProvider({ children }) {
  const [responses, dispatch] = useReducer(responseReducer, initialResponses);
  var cacheResponses = null;

  if (typeof window !== "undefined") {
    cacheResponses = JSON.parse(localStorage.getItem("userActivity"));
  }

  const dynamicResponses = cacheResponses
    ? { ...cacheResponses, ...responses }
    : { ...responses };

  return (
    <FunAicontext.Provider value={dynamicResponses}>
      <FunAiDispatchContext.Provider value={dispatch}>
        {children}
      </FunAiDispatchContext.Provider>
    </FunAicontext.Provider>
  );
}

export function useResponses() {
  return useContext(FunAicontext);
}

export function useResponseDispatch() {
  return useContext(FunAiDispatchContext);
}

function responseReducer(currentResponses, action) {
  switch (action.type) {
    case "customizing": {
      const updatedVariables = {
        process: "customized", // idel, fetching, fetched,deleted, error
        responses: [...currentResponses.responses],
        customization: action.customization,
      };

      localStorage.setItem("userActivity", JSON.stringify(updatedVariables));

      return updatedVariables;
    }
    case "remove-fetched": {
      var history = currentResponses.responses;
      console.log(currentResponses);
      console.log(action);
      var updated = history.filter(
        (res) => res.data.created !== action.created
      );

      const updatedRespone = {
        process: "deleted", // idel, fetching, fetched,deleted, error
        responses: updated,
        customization: currentResponses.customization,
      };

      //caching
      localStorage.setItem("userActivity", JSON.stringify(updatedRespone));

      return updatedRespone;
    }
    case "fetching": {
      return {
        process: "fetching", // idel, fetching, fetched,deleted, error
        responses: [...currentResponses.responses],
        customization: currentResponses.customization,
      };
    }
    case "fetched": {
      const updatedResponses = {
        process: "fetched", // idel, fetching, fetched,deleted, error
        responses: [
          {
            data: action.data,
            text: action.text,
          },
          ...currentResponses.responses,
        ],
        customization: currentResponses.customization,
      };

      localStorage.setItem("userActivity", JSON.stringify(updatedResponses));
      return updatedResponses;
    }

    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

var initialResponses = {
  process: "idle", // idel, fetching, fetched,deleted, error
  responses: [],
  customization: {
    temperature: 0,
    max_tokens: 62,
    model: "text-curie-001",
  },
};

if (typeof window !== "undefined") {
  initialResponses = {
    process: "idle",
    responses: JSON.parse(localStorage.getItem("userActivity"))
      ? JSON.parse(localStorage.getItem("userActivity")).responses
      : [],
    customization: JSON.parse(localStorage.getItem("userActivity"))
      ? JSON.parse(localStorage.getItem("userActivity")).customization
      : {
          temperature: 0,
          max_tokens: 62,
          model: "text-curie-001",
        },
  };
}
