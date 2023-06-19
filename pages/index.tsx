import axios from 'axios';
import NoResult from '../components/NoResult';
import VideoCard from '../components/VideoCard';
import { Video } from '../types';
import { BASE_URL } from '../utils';
interface IProps {
	videos: Video[];
}
const Home = ({ videos }: IProps) => {
	return (
		<div className='flex-flex-col gap-10 videosh-full'>
			{videos.length ? (
				videos?.map((video: Video) => <VideoCard key={video._id} post={video} />)
			) : (
				<NoResult text={'No Videos'} />
			)}
		</div>
	);
};
export const getServerSideProps = async ({ query: { topic } }: { query: { topic: string } }) => {
	let res = null;
	if (topic) {
		res = await axios.get(`${BASE_URL}/api/discover/${topic}`);
	} else {
		res = await axios.get(`${BASE_URL}/api/post`);
	}
	return {
		props: {
			videos: res.data,
		},
	};
};
export default Home;
