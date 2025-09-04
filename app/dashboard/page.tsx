import { auth, currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'

const Dashboard = async () => {
  const { userId } = await auth()
  if (!userId) {
    return <div>Sign in to view this page</div>
  }

  const user = await currentUser()

  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl text-blue-400'>Dashboard</h1>
      <Image
        src={user?.imageUrl || ''}
        alt='Profile Picture'
        width={24}
        height={24}
        className='rounded-full w-24 h-24'
      />
      <p>
        Welcome, {user?.firstName} {user?.lastName}!
      </p>
      <p>Your email is {user?.emailAddresses[0]?.emailAddress}</p>
      <p>
        Account created on:{' '}
        {user?.createdAt
          ? new Date(+user.createdAt).toLocaleString()
          : 'Unknown'}
      </p>
    </div>
  )
}

export default Dashboard
