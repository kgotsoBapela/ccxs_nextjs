import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/dbConnect';
import Bike from '@/models/Bike';
import { Box, Button, Typography, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import BikeTable from '@/app/admin/components/BikeTable';

interface Bike {
  _id: string;
  name: string;
  description: string;
  bikePic: string;
  status: string;
  __v?: number;
}

export default async function BikesPage() {
  await dbConnect();
  const bikes = await Bike.find({}).lean() as Bike[];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Manage Bikes
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        href="/admin/bikes/add"
        sx={{ mb: 2 }}
      >
        Add New Bike
      </Button>
      <Paper sx={{ p: 2, mt: 2 }}>
        <BikeTable bikes={bikes} />
      </Paper>
    </Box>
  );
}