import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Bike from '@/models/Bike';

export async function POST(request: Request) {
  await dbConnect();
  const body = await request.json();

  try {
    const newBike = await Bike.create(body);
    return NextResponse.json(newBike, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create bike' }, { status: 500 });
  }
}