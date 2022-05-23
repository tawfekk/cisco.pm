import { NavLink as RouterLink } from 'react-router-dom';
import { Button, ListItem } from '@mui/material';


const SidebarMenuItem = ({
  link,
  icon: Icon,
  open: openParent,
  name,
  ...rest
}) => {

  return (
    <ListItem component="div" key={name} {...rest}>
      <Button
        component={RouterLink}
        to={link}
        startIcon={Icon && <Icon />}
      >
        {name}
      </Button>
    </ListItem>
  );
};


export default SidebarMenuItem;
