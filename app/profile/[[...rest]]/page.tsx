import { UserProfile } from "@clerk/nextjs"

const Profile = async () => {
  
  return (
    <div className='min-h-[calc(100vh-64px)] flex flex-col items-center justify-center  p-4'>
      <UserProfile />
    </div>
  )
}

export default Profile
