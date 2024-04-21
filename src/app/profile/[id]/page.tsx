export default function UserProfile({params}:any) {
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>PROFILE</h1>
            <hr />
            <p className="text-4xl">Profile Page for user with id:  
            <span className="p-2 rounded bg-orange-500 text-black">{params.id}</span>
            </p>
            </div>
    )
}