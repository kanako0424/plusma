import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  //const currentUser = useAuth().currentUserと同値
  return (
    <Route
      {...rest}
      render={props => {
        //currentUserに値があれば前者を、なければ後者を返す
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}