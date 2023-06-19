import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResult from '../../components/NoResult';
import { IUser, Video } from '../../types';
import { BASE_URL } from '../../utils';

interface ProfileProps {
	data: {
		user: IUser;
		userVideos: Video[];
		userLikedVideos: Video[];
	};
}

const Profile = ({ data }: ProfileProps) => {
	console.log('data:', data);
	const [showUserVideos, setShowUserVideos] = useState(true);
	const [videosList, setVideosList] = useState<Video[]>([]);

	const { user, userVideos, userLikedVideos } = data;

	const videos = showUserVideos ? ' border-b-2 border-black' : 'text-gray-400';
	const liked = !showUserVideos ? ' border-b-2 border-black' : 'text-gray-400';

	useEffect(() => {
		const fetchVideos = async () => {
			if (showUserVideos) {
				setVideosList(userVideos);
			} else {
				setVideosList(userLikedVideos);
			}
		};
		fetchVideos();
	}, [showUserVideos, userLikedVideos, userVideos]);

	return (
		<div className='w-full'>
			<div className='flex gap-6 md:gap-10 mb-4 bg-white w-full'>
				<div className='w-16 h-16 md:h-32 justify-center'>
					<Image
						alt='user profile'
						src={user.image}
						width={120}
						height={120}
						className='rounded-full'
						layout='responsive'
						objectFit='cover'
					/>
				</div>
				<div>
					<p className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
						{user.userName.replaceAll(' ', '')}
						<GoVerified className='text-blue-400' />
					</p>
					<p className='capitalize md:text-xl text-gray-400 text-xs'>{user.userName}</p>
				</div>
			</div>
			<div>
				<div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full'>
					<p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={() => setShowUserVideos(true)}>
						Videos
					</p>
					<p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={() => setShowUserVideos(false)}>
						Liked
					</p>
				</div>
				<div className='flex gap-6 flex-wrap md:justify-start'>
					{videosList.length > 0 ? (
						videosList.map((post: Video, idx: number) => <VideoCard post={post} key={idx} />)
					) : (
						<NoResult text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`} />
					)}
				</div>
			</div>
		</div>
	);
};
export const getServerSideProps = async ({ params: { id } }: { params: { id: string } }) => {
	const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
	console.log('res:', res);
	return {
		props: { data: res.data },
	};
};

export default Profile;
