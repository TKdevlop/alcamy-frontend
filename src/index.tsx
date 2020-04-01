import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import firebase from "firebase/app";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";
const firebaseConfig = {
  apiKey: "AIzaSyDThNiKP9fOAusAXdws-BnLLjKQmzmz7OY",
  authDomain: "todo-app-with-hooks.firebaseapp.com",
  databaseURL: "https://todo-app-with-hooks.firebaseio.com",
  projectId: "todo-app-with-hooks",
  storageBucket: "todo-app-with-hooks.appspot.com",
  messagingSenderId: "114883808702",
  appId: "1:114883808702:web:9f6a7efad5ee6697"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <Router>
    <SnackbarProvider maxSnack={3}>
      <App />
    </SnackbarProvider>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
