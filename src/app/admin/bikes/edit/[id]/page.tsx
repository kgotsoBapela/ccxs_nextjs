import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Bike from '@/models/Bike';
import { Box, Typography } from '@mui/material';
import BikeForm from '@/app/admin/components/BikeForm';

export default async function EditBikePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    redirect('/');
  }

  await dbConnect();
  const bike = await Bike.findById(params.id).lean();

  if (!bike) {
    redirect('/admin/bikes');
  }

  // Serialize the bike object
  const serializedBike = JSON.parse(JSON.stringify(bike));

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Edit Bike
      </Typography>
      <BikeForm bike={serializedBike} />
    </Box>
  );
}