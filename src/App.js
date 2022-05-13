import React, { useState } from "react";

import "./App.css";
import Prompt from "./components/Prompt";
import Response from "./components/Response";
import FunAiProvider from "./contexts/FunAiProvider";

import Header from "./components/Header";
function App() {
  const [prompt, setPrompt] = useState("");

  // console.log(prompt);
  return (
    <main className="App-layout">
      <FunAiProvider>
        <Header />
        <Prompt setPromt={setPrompt} />
        <Response prompt={prompt} />
      </FunAiProvider>
    </main>
  );
}

export default App;
