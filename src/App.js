import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';




const App = () => {

  const content = useRoutes(routes);


  if (!localStorage.router_data) {
    localStorage.router_data = JSON.stringify([
      {
        interfaces: [{ porte: []}],
        dhcp: [{ ip: "" }],
        initial: [{ hostname: "R1" }],
      },
    ]);
  }

  if (!localStorage.router_final) {
    localStorage.router_final = JSON.stringify([
      {
        initial: "",
      },
    ]);
  }


  if (!localStorage.switch_data) {
    localStorage.switch_data = JSON.stringify([
      {
        interfaces: [{ porte: []}],
        dhcp: [{ ip: "" }],
        initial: [{ hostname: "S1" }],
      },
    ]);
  }

  if (!localStorage.switch_final) {
    localStorage.switch_final = JSON.stringify([
      {
        initial: "",
      },
    ]);
  }

  if (!localStorage.vlan_data) {
    localStorage.vlan_data = JSON.stringify([
      {
        navn: "",
        id: "",
      },
    ]);
  }

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
}
export default App;
