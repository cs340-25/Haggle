"use client"
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import React from 'react';

const SimpleUser = () => {
    const { user, error, isLoading } = useUser();

    return (
        <>
            {/* If loading, display loading animation */}
            {isLoading ? <>
                <p className='text-neutral-400'>
                    Loading user information...
                </p>

            {/* If done loading, display user info */}
            </> : <>
            
                {/* If user is logged in, display user info */}
                {user ? <>
                    <div className="bg-neutral-800 p-5 rounded-2xl flex flex-col items-center">
                    <Image
                        src={user.picture ?? ''}
                        alt={user.name ?? ''}
                        width={96}
                        height={96}
                        priority
                        className="rounded-full m-5"
                        unoptimized
                    />
                    <p className="text-xl text-center"><b>{user.name}</b></p>
                    <p className="text-neutral-400 text-center">{user.email}</p>
                    </div>
                    <a href="/api/auth/logout" className="flex flex-col items-center">
                    <div className="px-5 py-2 bg-color bg-red-600 hover:bg-red-500 w-fit rounded-lg">
                        Logout
                    </div>
                    </a>
                
                {/* If not logged in, show login button */}
                </> : 
                    <a href="/api/auth/login" className="flex flex-col items-center">
                    <p className="text-neutral-400">Not signed in.</p>
                    <div className="px-5 py-2 bg-color bg-blue-600 hover:bg-blue-500 w-fit rounded-lg">
                        Login
                    </div>
                    </a>
                }
            </>}
        </>
    )
}

export default SimpleUser;
