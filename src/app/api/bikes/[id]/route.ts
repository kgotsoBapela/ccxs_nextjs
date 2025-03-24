import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Bike from '@/models/Bike';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  await dbConnect();
  const body = await request.json();

  try {
    const updatedBike = await Bike.findByIdAndUpdate(params.id, body, { new: true });
    if (!updatedBike) {
      return NextResponse.json({ error: 'Bike not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBike);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update bike' }, { status: 500 });
  }
}