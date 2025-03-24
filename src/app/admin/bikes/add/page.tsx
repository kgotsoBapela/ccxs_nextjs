import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { Box, Typography } from '@mui/material';
import BikeForm from '../../components/BikeForm';

export default async function AddBikePage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Add New Bike
      </Typography>
      <BikeForm />
    </Box>
  );
}