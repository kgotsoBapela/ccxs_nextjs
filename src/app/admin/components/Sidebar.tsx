import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { DirectionsBike, People } from '@mui/icons-material';
import Link from 'next/link';

const drawerWidth = 240;

export default function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        <Typography variant="h6" noWrap>
          Admin Dashboard
        </Typography>
      </Toolbar>
      <List>
        <Link href="/admin/bikes" passHref legacyBehavior>
          <ListItemButton component="a">
            <ListItemIcon>
              <DirectionsBike />
            </ListItemIcon>
            <ListItemText primary="Manage Bikes" />
          </ListItemButton>
        </Link>
        <Link href="/admin/users" passHref legacyBehavior>
          <ListItemButton component="a">
            <ListItemIcon>
              <People />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItemButton>
        </Link>
      </List>
    </Drawer>
  );
}