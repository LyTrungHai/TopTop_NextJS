import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../../utils';
import { IUser, Video } from '../../types';
import { text } from 'stream/consumers';
import NoResult from '../../components/NoResult';
import { useRouter } from 'next/router';
import VideoCard from '../../components/VideoCard';
import useAuthStore from '../../store/authStore';
import Link from 'next/link';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';

const Search = ({ videos }: { videos: Video[] }) => {
	const [isAccounts, setIsAccounts] = useState(true);
	const router = useRouter();
	const { searchTerm }: any = router.query;
	const { allUsers } = useAuthStore();
	const accounts = isAccounts ? ' border-b-2 border-black' : 'text-gray-400';
	const isVideos = !isAccounts ? ' border-b-2 border-black' : 'text-gray-400';

	const searchedAccounts = allUsers.filter((user: IUser) =>
		user.userName.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<div className='w-full'>
			<div className='flex gap-10 mb-10 border-b-2 border-gray-200 md:fixed z-50 bg-white w-full'>
				<p className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`} onClick={() => setIsAccounts(true)}>
					Accounts
				</p>
				<p className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`} onClick={() => setIsAccounts(false)}>
					Videos
				</p>
			</div>
			{isAccounts ? (
				<div className='md:mt-16'>
					{searchedAccounts.length > 0 ? (
						searchedAccounts.map((user: IUser, idx: number) => (
							<Link href={`/profile/${user._id}`} key={idx}>
								<div className='flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200'>
									<div>
										<Image
											alt='user profile'
											src={user.image}
											width={50}
											height={50}
											className='rounded-full'
											objectFit='cover'
										/>
									</div>
									<div className='hidden xl:block'>
										<p className='flex gap-1 items-center text-lg font-bold text-primary'>
											{user.userName}
											<GoVerified className='text-blue-400' />
										</p>
										<p className='capitalize text-gray-400 text-xs'>{user.userName}</p>
									</div>
								</div>
							</Link>
						))
					) : (
						<NoResult text={`No accounts results for ${searchTerm}`} />
					)}
				</div>
			) : (
				<div className='md:mt-16 flex flex-wrap gap-6 md:justify-start'>
					{videos.length ? (
						videos.map((video: Video, idx) => <VideoCard post={video} key={idx} />)
					) : (
						<NoResult text={`No video results for ${searchTerm}`} />
					)}
				</div>
			)}
		</div>
	);
};
export const getServerSideProps = async ({ params: { searchTerm } }: { params: { searchTerm: string } }) => {
	const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
	return {
		props: { videos: res.data },
	};
};

export default Search;
