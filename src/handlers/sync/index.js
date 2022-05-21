import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3npySkxT-_E2ZESGzzftE6JZagBf-UHQ", //hack mig :-)
  authDomain: "cisco-pm.firebaseapp.com",
  projectId: "cisco-pm",
  storageBucket: "cisco-pm.appspot.com",
  messagingSenderId: "727036040743",
  appId: "1:727036040743:web:a7c5f4382c0f5ab1ada002",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);



  export async function syncup() {
    if (sessionStorage.sessionid) {
      try {
        await setDoc(doc(db, sessionStorage.sessionid, "router"), {
          data: JSON.parse(localStorage.router_data),
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
