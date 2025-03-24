'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface BikeFormProps {
  bike?: {
    _id: string;
    name: string;
    model: string;
    bikePic: string;
    status: string;
  };
}

export default function BikeForm({ bike }: BikeFormProps) {
  const [name, setName] = useState(bike?.name || '');
  const [model, setmodel] = useState(bike?.model || '');
  const [bikePic, setImageUrl] = useState(bike?.bikePic || '');
  const [status, setStatus] = useState(bike?.status || 'active');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBike = { name, model, bikePic, status };

    const url = bike ? `/api/bikes/${bike._id}` : '/api/bikes';
    const method = bike ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBike),
      });

      if (!response.ok) {
        throw new Error('Failed to save bike');
      }

      router.push('/admin/bikes');
      router.refresh(); // Refresh the page to show updated data
    } catch (error) {
      console.error('Error saving bike:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400 }}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="model"
        value={model}
        onChange={(e) => setmodel(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="bikePic URL"
        value={bikePic}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Status</InputLabel>
        <Select value={status} onChange={(e) => setStatus(e.target.value as string)} required>
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="maintenance">Maintenance</MenuItem>
          <MenuItem value="not available">Not Available</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {bike ? 'Update Bike' : 'Add Bike'}
      </Button>
    </Box>
  );
}