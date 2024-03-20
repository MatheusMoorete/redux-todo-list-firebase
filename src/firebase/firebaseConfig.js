
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCqapyeAOLontv9cgUwy2_tde5rSZ4M9ZE",
  authDomain: "redux-todo-list-37389.firebaseapp.com",
  projectId: "redux-todo-list-37389",
  storageBucket: "redux-todo-list-37389.appspot.com",
  messagingSenderId: "856068657758",
  appId: "1:856068657758:web:be33dd3568cdc53cf19acf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

