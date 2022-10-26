import React from "react";
import "./login.css";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";

import { Button } from "@mui/material";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function Login() {
  const [{}, dispatch] = useStateValue();
  const provider = new GoogleAuthProvider();
  const signIn = () => {
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
          hat: "love hats",
        });
      })
      .catch((error) => {
        console.log(error.message);
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div className="login">
      <div className=" login_container ">
        <img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/OS_X-Logo.svg" />
        <div className=" login_text">
          <h3>SIGN IN TO XMESSAGE</h3>
          <Button onClick={signIn}>sign in with google</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
