import "./App.css";
import "./firebase/config";
import Header from "./Header";
import React from "react";
import Signup from "./pages/Signup";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { UserProvider } from "./firebase/UserProvider";
import Profile from "./pages/Profile";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header></Header>
        <div className="app">
          <div>
            <Switch>
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile" component={Profile} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
