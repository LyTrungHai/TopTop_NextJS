import React, { useEffect } from 'react';
import { GoVerified } from 'react-icons/go';
import useAuthStore from '../store/authStore';
import Link from 'next/link';
import { IUser } from '../types';
import Image from 'next/image';

const SuggestedAccounts = () => {
	const { fetchAllUsers, allUsers } = useAuthStore();

	useEffect(() => {
		fetchAllUsers();
	}, [fetchAllUsers]);

	return (
		<div className='xl:border-b-2 border-gray-200 pb-4'>
			<p className='text-gray-500 font-semibold m-3 mt-4 hidden xl:block'>Suggested Accounts</p>
			<div>
				{allUsers.slice(0, 6).map((user: IUser) => (
					<Link key={user._id} href={`/profile/${user._id}`}>
						<div className='flex gap-3 hover:bg-primary p-2 cursor-pointer font-semibold rounded'>
							<div className='w-8 h-8'>
								<Image
									alt='user profile'
									src={user.image}
									width={34}
									height={34}
									className='rounded'
									layout='responsive'
									objectFit='cover'
								/>
							</div>
							<div className='hidden xl:block'>
								<p className='flex gap-1 items-center text-md font-bold text-primary lowercase'>
									{user.userName.replaceAll(' ', '')}
									<GoVerified className='text-blue-400' />
								</p>
								<p className='capitalize text-gray-400 text-xs'>{user.userName}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default SuggestedAccounts;
