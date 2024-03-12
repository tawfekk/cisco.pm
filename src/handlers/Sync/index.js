import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { doc, getFirestore, setDoc, getDoc } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyD3npySkxT-_E2ZESGzzftE6JZagBf-UHQ",
  authDomain: "cisco-pm.firebaseapp.com",
  projectId: "cisco-pm",
  storageBucket: "cisco-pm.appspot.com",
  messagingSenderId: "727036040743",
  appId: "1:727036040743:web:a7c5f4382c0f5ab1ada002",
});

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LdAWnspAAAAAEj2gUO9au2IIwlArT89fV6ZNbq_"),
  isTokenAutoRefreshEnabled: true
});

const db = getFirestore(app);

export async function syncup(data, type) {
  if (sessionStorage.sessionid) {
    await setDoc(
      doc(db, sessionStorage.sessionid, type),
      {
        data: data,
      },
      { merge: true }
    );
  }
}
export async function syncupchange(
  tabid,
  id,
  value,
  type,
  nest,
  nestindex,
  index
) {
  try {
    if (sessionStorage.sessionid) {
      const docSnap = await getDoc(doc(db, sessionStorage.sessionid, type));
      let workingdata = docSnap.data()["data"];
      if (nest && value) {
        workingdata[tabid][nest][nestindex][id] = value;
      } else if (index != undefined && !nest && !value) {
        workingdata[tabid][id].splice(index, 1);
      } else if (index != undefined && nest) {
        workingdata[tabid][nest][nestindex][id].splice(index, 1);
      } else {
        workingdata[tabid][id] = value;
      }
      await setDoc(
        doc(db, sessionStorage.sessionid, type),
        {
          data: workingdata,
        },
        { merge: true }
      );
    }
  } catch (e) {}
}

export async function syncdown(type) {
  if (sessionStorage.sessionid) {
    const docSnap = await getDoc(doc(db, sessionStorage.sessionid, type));
    try {
      if (docSnap.data()["data"] == 0) {
        sessionStorage.clear(), localStorage.clear(), window.location.reload();
      } else {
        localStorage.setItem(
          type + "_data",
          JSON.stringify(docSnap.data()["data"])
        );
      }
    } catch (e) {}
  }
}