import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase"
import firebase from "firebase/app"

const NicknameContext = React.createContext()

export function useAuth() {
  return useContext(NicknameContext)
}

function NicknameContext() {
  return (
    <div>
      
    </div>
  )
}

export default NicknameContext
