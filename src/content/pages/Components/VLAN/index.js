import { Helmet } from "react-helmet-async";
import { StatusError } from "src/content/pages/Status/Error";
import PageTitle from "src/components/PageTitle";
import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  TextField,
  Box,
  Button,
  IconButton,
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import Footer from "src/components/Footer";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { syncup } from "src/handlers/Sync";

import { initializeApp } from "firebase/app";
import { doc, getFirestore, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD3npySkxT-_E2ZESGzzftE6JZagBf-UHQ", 
  authDomain: "cisco-pm.firebaseapp.com",
  projectId: "cisco-pm",
  storageBucket: "cisco-pm.appspot.com",
  messagingSenderId: "727036040743",
  appId: "1:727036040743:web:a7c5f4382c0f5ab1ada002",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function VLAN() {
  window.onload = function () {
    sync();
  };

  const [formFields, setformFields] = useState(
    JSON.parse(localStorage.vlan_data)
  );

  const handleFormChange = (event, index) => {
    let data = [...formFields];
    if (event.target.type == "text") {
      data[index][event.target.name] = event.target.value;
    } else {
      data[index][event.target.name] = event.target.checked;
    }
    setformFields(data);
    localStorage.vlan_data = JSON.stringify(data);
    syncup(data, "vlan");
  };

  const addFields = () => {
    let data = [...formFields];
    let object = {
      navn: "",
      id: "",
    };
    data.push(object);
    //workingarray = formFields[tabid]
    setformFields(data);
    //localStorage.router_data = JSON.stringify(data)
  };

  const removeFields = (index) => {
    let data = [...formFields];
    data.splice(index, 1);
    setformFields(data);
    localStorage.vlan_data = JSON.stringify(data);
    syncup(formFields, "vlan");
  };

  async function sync() {
    try {
      if (sessionStorage.sessionid) {
        const docRef = doc(db, sessionStorage.sessionid, "vlan");
        const docSnap = await getDoc(docRef);
        setformFields(docSnap.data()["data"]);
        localStorage.vlan_data = JSON.stringify(docSnap.data()["data"]);
      }
      //else {
      //  setformFields(JSON.parse(localStorage.router_data));
      //}
    } catch (e) {
      console.log(e);
    }
  }
  try {
    return (
      <>
        <Container maxWidth="md">
          <Helmet>
            <title>VLAN</title>
          </Helmet>
          <PageTitleWrapper>
            <PageTitle sx={{ mb: -1 }} heading="VLAN" />
          </PageTitleWrapper>
          <Card>
            <CardContent>
              {formFields.map((form, index) => {
                return (
                  <div key={index}>
                    <Box
                      sx={{
                        "& .MuiTextField-root": { m: 1, width: "25ch" },
                      }}
                      autoComplete="off"
                    >
                      <IconButton
                        sx={{ float: "right", mt: 1.5 }}
                        onClick={() => removeFields(index)}
                      >
                        <DeleteIcon color="secondary" />
                      </IconButton>
                      <TextField
                        name="id"
                        label="VlAN ID"
                        placeholder="999"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.id}
                      />
                      <TextField
                        name="navn"
                        label="VLAN name"
                        placeholder="Production"
                        onChange={(event) => handleFormChange(event, index)}
                        value={form.navn}
                      />
                      <Divider sx={{ mt: 2, mb: 2 }} />
                    </Box>
                  </div>
                );
              })}
              <Button
                variant="contained"
                sx={{ margin: 1 }}
                size="medium"
                color="primary"
                onClick={() => addFields()}
              >
                Add a VLAN
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  localStorage.removeItem("vlan_data");
                  window.location.reload();
                }}
              >
                Remove all VLANs
              </Button>
            </CardContent>
          </Card>
        </Container>
        <Footer />
      </>
    );
  } catch (e) {
    StatusError("vlan");
  }
}

export default VLAN;
