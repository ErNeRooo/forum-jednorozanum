import HomePage from "./HomePage/HomePage";
import "./global.sass";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
export default function Home() {
  //firebase.initializeApp(firebaseConfig);

  return (
    <div>
      <HomePage />
    </div>
  );
}
