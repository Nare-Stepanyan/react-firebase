import "./App.css";
import "./firebase/config";
import Header from "./Header";
import React from "react";
import Signup from "./pages/Signup";
import { Route, Switch, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <div className="app">
        <div>
          <Switch>
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
