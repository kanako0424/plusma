import React from "react"
import Signup from "./Signup"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Login from "./Login"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import firebase from 'firebase/app';
import 'firebase/firestore';

// import logo from './logo.svg';
import '../App.css';


/*eslint no-undef: "error"*/

const firebaseConfig = {
  apiKey: "AIzaSyAhBE0EfVjaL4NypnSJnOwLr9CneSpZfiY",
  authDomain: "plusma-1927f.firebaseapp.com",
  projectId: "plusma-1927f",
  storageBucket: "plusma-1927f.appspot.com",
  messagingSenderId: "929406529962",
  appId: "1:929406529962:web:5992c2c773ad8b672c7bd3",
  measurementId: "G-DSN26WMK72"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}


function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App