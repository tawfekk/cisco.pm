import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material/styles";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";
import { Version } from "src/components/Logo";

const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }

        .MuiListItem-root {
            transition: ${theme.transitions.create(["color", "fill"])};

            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};

                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {

                    background: transparent;

                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
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
      <ListWrapper>
      <Version />
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: "MuiListItem-indicators" }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Værktøjer
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem
          onClick={() =>
            window.open("https://netacad.com/portal/saml_login", "_blank")
          }
          sx={{ px: 3 }}
        >
          Netacademy
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/status/coming-soon">
          Historik
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/status/coming-soon">
          Dokumentation
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/status/report-error">
          Fejlrapporting
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
