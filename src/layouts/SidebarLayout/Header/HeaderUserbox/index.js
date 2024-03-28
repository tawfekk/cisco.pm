import { useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

import {
  Avatar,
  Box,
  Button,
  Divider,
  Hidden,
  lighten,
  List,
  ListItem,
  IconButton,
  ListItemText,
  Popover,
  Typography
} from '@mui/material';

import { styled } from '@mui/material/styles';
import FolderSpecialIconTwoTone from '@mui/icons-material/FolderSpecialTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';


let userinfo = {name: "Unknown User"}


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

fetch('https://login.cisco.pm/application/o/userinfo/', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${localStorage.providerAccessToken}`,
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    console.log('Network response was not ok');
  }
  return response.json();
})
.then(data => {
  localStorage.userinfo = JSON.stringify(data)
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});



const UserBoxButton = styled(Button)(
  ({ theme }) => `
        padding-left: ${theme.spacing(1)};
        padding-right: ${theme.spacing(1)};
`
);

const MenuUserBox = styled(Box)(
  ({ theme }) => `
        background: ${theme.colors.alpha.black[5]};
        padding: ${theme.spacing(2)};
`
);

const UserBoxText = styled(Box)(
  ({ theme }) => `
        text-align: left;
        padding-left: ${theme.spacing(1)};
`
);

const UserBoxLabel = styled(Typography)(
  ({ theme }) => `
        font-weight: ${theme.typography.fontWeightBold};
        color: ${lighten(theme.palette.secondary.main, 0.4)};
        display: block;
`
);

const UserBoxDescription = styled(Typography)(
  ({ theme }) => `
        color: ${theme.palette.secondary.main}
`
);

function HeaderUserbox() {
  try{
  const user = {
    name: JSON.parse(localStorage.userinfo).name,
    avatar: stringAvatar(JSON.parse(localStorage.userinfo).name),
    email: JSON.parse(localStorage.userinfo).email
  };

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
     <IconButton sx={{ml: 2}} color="primary" aria-label="upload picture" onClick={handleOpen} component="span">
      <Avatar {...user.avatar} />
      </IconButton>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <MenuUserBox sx={{ minWidth: 210 }} display="flex">
          <Avatar variant="rounded" alt={user.name} src={user.avatar} />
          <UserBoxText>
            <UserBoxLabel variant="body1">{user.name}</UserBoxLabel>
            <UserBoxDescription variant="body2">{user.email}</UserBoxDescription>
          </UserBoxText>
        </MenuUserBox>
        <Divider sx={{ mb: 0 }} />
        <List sx={{ p: 1 }} component="nav">
          <ListItem button to="/status/coming-soon" component={NavLink}>
            <FolderSpecialIconTwoTone fontSize="small" />
            <ListItemText primary="Saved data" />
          </ListItem>
          <ListItem
            button
            to="https://login.cisco.pm/if/user/#/settings"
            component={NavLink}
          >
            <ManageAccountsTwoToneIcon fontSize="small" />
            <ListItemText primary="Manage account" />
          </ListItem>
        </List>
        <Divider />
        <Box sx={{ m: 1 }}>
        <Button color="primary" fullWidth onClick={() => {
            localStorage.providerAccessToken = "";
            localStorage.loginrefreshed = false
            window.location.reload();
        }}>
            <LockOpenTwoToneIcon sx={{ mr: 1 }} />
            Sign out
          </Button>
        </Box>
      </Popover>
    </>
  );
      } catch (e) {
        if (!localStorage.loginrefreshed) {
          localStorage.loginrefreshed = true;
          setTimeout(() => {
            window.location.reload();
          }, 500);
        }
      }
}

export default HeaderUserbox;
