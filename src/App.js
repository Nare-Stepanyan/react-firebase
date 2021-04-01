import "./App.css";
import "./firebase/config";
import Header from "./Header";
import React from "react";

function App() {
  return (
    <div>
      <Header></Header>
      <div className="app">
        <div className="ui grid container"></div>
      </div>
    </div>
  );
}

export default App;
