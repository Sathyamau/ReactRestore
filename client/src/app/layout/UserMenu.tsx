
import { Button, Menu, MenuItem, Fade, ListItemText, Divider } from "@mui/material";
import { useState } from "react";
import type { User } from "../models/user";
import { useLogoutMutation } from "../../features/account/accountApi";

type Props = {
    user: User
};

const UserMenu = ({user}: Props) => {

  const [logout] = useLogoutMutation();  
 const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        onClick={handleClick}
        color="inherit"
        size="large"
        sx={{ fontSize: '1.1rem' }}>
        {user.email}
      </Button>
      <Menu
        id="fade-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'fade-button',
          },
        }}
        slots={{ transition: Fade }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem>
            <ListItemText>My Profile</ListItemText>
        </MenuItem>
        <MenuItem>
            <ListItemText>My account</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={logout}>
            <ListItemText>Logout</ListItemText>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;