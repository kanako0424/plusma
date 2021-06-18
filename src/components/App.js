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
import MyPage from "./MyPage"
import '../App.css';
import PostDetails from "./PostDetails"
import NotFound from './404'
import UserPage from "./UserPage"
import MypagePostDetails from "./MypagePostDetails"
/*eslint no-undef: "error"*/
import Head from "./Head"

function App() {

  return (
    <>
      <Head />
      <Router>
        <Switch>
          <Route path="/search" component={Search} />
          <Route exact path="/" component={Dashboard}/>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/mypage" component={MyPage} />
              <PrivateRoute path="/mypage/posts/:id" component={MypagePostDetails} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/create-post(/:id)?" component={CreatePost} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/users/:id" component={UserPage} />
              <Route path="/posts/:id" component={PostDetails} />
              <Route component={NotFound} />
            </Switch>
          </AuthProvider>
        </Switch>
      </Router>
    </>
  )
}

export default App