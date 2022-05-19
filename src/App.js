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
