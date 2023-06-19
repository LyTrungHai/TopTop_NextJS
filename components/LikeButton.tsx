import React, { useState, useEffect } from 'react';
import { MdFavorite } from 'react-icons/md';

import useAuthStore from '../store/authStore';

interface LikeButtonProps {
	handleLike: () => void;
	handleDislike: () => void;
	likes: any[];
}
const LikeButton = ({ handleLike, handleDislike, likes }: LikeButtonProps) => {
	const [alreadyLiked, setAlreadyLiked] = useState(false);
	const { userProfile }: any = useAuthStore();

	const filterLike = likes?.filter((item) => item._ref === userProfile?._id);
	useEffect(() => {
		if (filterLike?.length > 0) {
			setAlreadyLiked(true);
		} else {
			setAlreadyLiked(false);
		}
	}, [filterLike, likes]);

	return (
		<div className='flex gap-6'>
			<div className='mt-4 flex flex-col justify-center items-center cursor-pointer'>
				{alreadyLiked ? (
					<div className='bg-primary rounded-full p2 md:p-4 text-[#F51997]' onClick={handleDislike}>
						<MdFavorite className='text-lg md:text-2xl' />
					</div>
				) : (
					<div className='bg-primary rounded-full p2 md:p-4' onClick={handleLike}>
						<MdFavorite className='text-lg md:text-2xl' />
					</div>
				)}
				<p className='textmd- font-semibold'>{likes?.length | 0}</p>
			</div>
		</div>
	);
};

export default LikeButton;
