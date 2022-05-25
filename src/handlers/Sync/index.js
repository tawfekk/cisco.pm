import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

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


  export async function syncup(data, type) {
    if (sessionStorage.sessionid) {
    //  try {
        await setDoc(doc(db, sessionStorage.sessionid, type), {
          data: data,
        });
    //  } catch (e) {
    //    console.log(e);
    //  }
    }
  }

  export async function syncdown(type) {
      if (sessionStorage.sessionid) {
        const docRef = doc(db, sessionStorage.sessionid, type);
        const docSnap = await getDoc(docRef);
        if (docSnap.data()["data"]){
        localStorage.setItem(type+"_data",JSON.stringify(docSnap.data()["data"]))}
        else if (docSnap.data()["data"] == 0){sessionStorage.clear(),localStorage.clear(),window.location.reload()}
      }
  }
