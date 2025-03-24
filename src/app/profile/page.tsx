import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import ProfileForm from '@/components/ProfileForm';
export const dynamic = "force-dynamic";

export default async function Profile() {
 
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      redirect('/auth/signin');
    }
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p>Welcome, {session.user.email}</p>
        <ProfileForm />
      </div>
    );
  } catch (error) {
    console.error('Error fetching session:', error);
    redirect('/auth/signin');
  }
  return <div>Profile Page</div>;
}