"use client";

import { Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from 'next/link';
import { useState } from 'react';

interface Bike {
  _id: string;
  name: string;
  model: string;
  bikePic: string;
  status: string;
  __v?: number;
}

interface BikeTableProps {
  bikes: Bike[];
}

export default function BikeTable({ bikes: initialBikes }: BikeTableProps) {
  const [bikes, setBikes] = useState(initialBikes);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/bikes/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted bike from the state
        setBikes(bikes.filter(bike => bike._id !== id));
      } else {
        console.error('Failed to delete bike');
      }
    } catch (error) {
      console.error('Error deleting bike:', error);
    }
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Model</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {bikes.map((bike) => (
          <TableRow key={bike._id}>
            <TableCell>{bike.name}</TableCell>
            <TableCell>{bike.model}</TableCell>
            <TableCell>{bike.status}</TableCell>
            <TableCell>
              <Link href={`/admin/bikes/edit/${bike._id}`} passHref legacyBehavior>
                <IconButton component="a" color="primary">
                  <EditIcon />
                </IconButton>
              </Link>
              <IconButton
                color="error"
                onClick={() => handleDelete(bike._id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}