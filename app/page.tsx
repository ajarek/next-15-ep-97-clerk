import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl text-blue-400'>Welcome to Clerk + Next.js</h1>
      <p className='max-w-2xl text-center text-gray-400'>
        This is a simple app demonstrating Clerk integration with Next.js App
        Router. Sign in to view your dashboard, or sign up to get started.
      </p>

      <SignedOut>
        <div className='flex gap-4'>
          <Link
            href='/sign-in'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition'
          >
            Sign In
          </Link>
          <Link
            href='/sign-up'
            className='bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-xl transition'
          >
            Sign Up
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className='flex flex-col items-center gap-4'>
          <p className='text-green-600 font-medium'>You&apos;re signed in.</p>
          <UserButton />
          <Link
            href='/dashboard'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition'
          >
            Go to Dashboard
          </Link>
          <Link
            href='/profile'
            className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition'
          >
            Go to Profile
          </Link>
        </div>
      </SignedIn>
    </main>
  )
}
