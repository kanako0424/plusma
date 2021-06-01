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
import Mypage from "./Mypage"
import '../App.css';
import PostDetails from "./PostDetails"
import NotFound from './404'
/*eslint no-undef: "error"*/

function App() {

  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path="/" component={Dashboard}/>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/create-post(/:id)?" component={CreatePost} />
            <Route path="/search" component={Search} />
            {/* <Route path="/my-page" component={Mypage} /> */}
            <Route path="/users/:id" component={Mypage} />
            <Route path="/posts/:id" component={PostDetails} />
            <Route component={NotFound} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App