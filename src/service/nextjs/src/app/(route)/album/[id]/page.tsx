import { Types } from 'mongoose';
import style from '../../../_style/(route)/album/[id]/index.module.css';
import Header from '@/app/_component/header';
import AlbumPageDiary from './diary';
import { Diary } from '@/app/_type';

const CreateMockDiaries = (count: number): Diary[] => {
	const diaries: Diary[] = [];

	for (let i = 0; i < count; i++) {
		const _id = new Types.ObjectId();
		const images = [];
		const imageLength = Math.floor(Math.random() * 5) + 1;
		for (let j = 0; j < imageLength; j++) {
			images.push(`/default-image-0${Math.floor(Math.random() * 10)}.png`);
		}
		const title = 'Title' + (i < 10 ? '0' + i : i);
		const content = ('Content' + (i < 10 ? '0' + i : i)).repeat(Math.floor(Math.random() * 20) + 1);
		const createdAt = new Date();
		const updatedAt = new Date();

		diaries.push({
			_id,
			images,
			title,
			content,
			createdAt,
			updatedAt,
		});
	}
	return diaries;
};

const AlbumPage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const title = 'Album';
	const diaries = CreateMockDiaries(10);

	return (
		<div className={style.container}>
			<Header title={title} divider />
			<div>
				{diaries.map((diary, index) => (
					<AlbumPageDiary key={index} {...diary} />
				))}
			</div>
		</div>
	);
};

export default AlbumPage;
