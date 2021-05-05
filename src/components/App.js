import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import CreatePost from "./CreatePost"
import Search from "./Search"
//import firebase from 'firebase/app'
//import 'firebase/firestore'
// import logo from './logo.svg';
import '../App.css';
import PostDetails from "./PostDetails"
/*eslint no-undef: "error"*/

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard}/>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/create-post" component={CreatePost} />
            <Route path="/search" component={Search} />
            <Route path="/posts/:id" component={PostDetails} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App