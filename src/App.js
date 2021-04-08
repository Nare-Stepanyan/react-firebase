import "./App.css";
import "./firebase/config";
import Header from "./Header";
import React from "react";
import Signup from "./pages/Signup";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import { UserProvider } from "./firebase/UserProvider";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Users from "./pages/Users";
import ProfileRedirect from "./router/ProfileRedirect";
import PrivateRoute from "./router/PrivateRoute";
import AdminRoute from "./router/AdminRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Header></Header>
        <div className="app">
          <div>
            <Switch>
              <ProfileRedirect exact path="/signup" component={Signup} />
              <ProfileRedirect exact path="/signin" component={Login} />
              <PrivateRoute exact path="/profile/:id" component={Profile} />
              <AdminRoute exact path="/users" component={Users} />
              <Route exact path="/">
                <Redirect to="/signin" />
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
