import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import crypto from 'crypto';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { email } = await request.json();
    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' });
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();
    // In production, send email with link: `/auth/reset?token=${resetToken}`
    console.log(`Reset link: /auth/reset?token=${resetToken}`);
    return NextResponse.json({ message: 'If the email exists, a reset link has been sent.' });
  } catch (error) {
    return NextResponse.json({ error: 'Error requesting reset' }, { status: 500 });
  }
}