import { useGetTopFiveFollowerQuery } from '@/src/redux/Users/userManagementApi';
import { TUser } from '@/src/types/decodedUser';
import Image from 'next/image';
import React from 'react';

const TopFiveFollowers = () => {
    const { data } = useGetTopFiveFollowerQuery(undefined)
    return (
        <div>
            <div className='flex justify-center'>
                <h1 className="text-4xl inline-block bg-black rounded-lg px-4 py-2 text-white font-bold">Top Five Followers</h1>
            </div>
            <div className='flex flex-wrap gap-x-4 my-8 justify-center'>
                {
                    data?.data?.map((follower: TUser) => (
                        <div key={follower._id}>
                            <div className='flex group hover:bg-[#1BEEA2] transition-all cursor-pointer justify-center items-center gap-x-2 bg-slate-100 rounded-md border p-2'>
                                <Image className='rounded-full border border w-16 h-16' width={64} height={64} src={follower.profilePicture} alt={follower.name} />
                                <div>
                                    <p className='text-xl font-medium group-hover:text-black'>{follower.name}</p>
                                    <p className=''><span className='text-2xl font-medium'>{follower.followers.length}</span> Follower</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default TopFiveFollowers;