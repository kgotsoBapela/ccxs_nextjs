import { Box, Typography } from '@mui/material';

export default function Dashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Admin Dashboard
      </Typography>
      <Typography variant="body1" paragraph>
        Here you can manage bikes and users. Use the sidebar to navigate.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Quick Stats</Typography>
        <Typography variant="body2" color="text.secondary">
          - Total Bikes: Coming soon...
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Total Users: Coming soon...
        </Typography>
      </Box>
    </Box>
  );
}