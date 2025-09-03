import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import Link from 'next/link'

const Navbar = () => {
  return (
    <header className="flex justify-between items-center px-8  h-16 border-b border-blue-400">
      <nav className='flex items-center gap-8'>
              <Link className='text-xl text-blue-700 hover:text-blue-400' href="/">Home</Link>
              <Link className='text-xl text-blue-700 hover:text-blue-400' href="/dashboard">Dashboard</Link>
              <Link className='text-xl text-blue-700 hover:text-blue-400' href="/profile">Profile</Link>
            </nav>
      <div>
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            </div>
            
          </header>
  )
}

export default Navbar