import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { token, password } = await request.json();
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });
    if (!user) return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    user.password = password;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Error resetting password' }, { status: 500 });
  }
}