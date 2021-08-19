import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  // Your Firebase Config API
});

export const auth = app.auth();
export default app;
