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
    await setDoc(
      doc(db, sessionStorage.sessionid, type),
      {
        data: data,
      },
      { merge: true }
    );
    //  } catch (e) {
    //    console.log(e);
    //  }
  }
}
export async function syncupchange(
  tabid,
  id,
  value,
  type,
  nest,
  nextindex,
  index
) {
  try {
    if (sessionStorage.sessionid) {
      const docSnap = await getDoc(doc(db, sessionStorage.sessionid, type));
      //  await updateDoc(doc(db, sessionStorage.sessionid, type), {
      //  [`data.${tabid}`]: {[`${id}`]:{[`${index}`]:{[`${name}`]:value}}}
      //  });
      let workingdata = docSnap.data()["data"];
      if (nest) {
        workingdata[tabid][nest][nestindex][id] = value;
      } else if (index && !nest) {
        workingdata[tabid][id].splice(index, 1);
      } else if (index && nest) {
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
