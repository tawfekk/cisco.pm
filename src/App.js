import { useRoutes } from 'react-router-dom';
import routes from './router';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import ThemeProvider from './theme/ThemeProvider';
import { CssBaseline } from '@mui/material';


window.onload = function () {
  if (!localStorage.getItem("router_data")){localStorage.router_data = JSON.stringify(
[
  {
    interfaces: [{ porte: [] }],
    dhcp: [{ ip: "" }],
    initial: [{ hostname: "" }],
  }
]
)}
};

const App = () => {

  const content = useRoutes(routes);

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
