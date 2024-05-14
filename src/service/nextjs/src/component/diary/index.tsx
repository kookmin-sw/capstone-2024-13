import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import DiarySwiper from './swiper';
import DiaryComponentEditContent from './edit-content';
import DiaryComponentEditTitle from './edit-title';
import DiaryComponentEditPublic from './edit-public';
import DiaryComponentHeader from './header';
import style from '@/style/component/diary/index.module.css';
import Button from '../button';
import { patchFetcher } from '@/service/api';
import { Diary } from '@/type';

const DiaryComponent = (props: {
	profileImageSrc?: string;
	author?: string;
	diaryId?: string;
	createdAt?: Date;
	title?: string;
	content?: string;
	images?: string[];
	component?: ReactNode;
	isPublic?: boolean;
	isEditing?: boolean;
	setTitle?: Dispatch<SetStateAction<string | undefined>>;
	setContent?: Dispatch<SetStateAction<string | undefined>>;
	setIsPublic?: Dispatch<SetStateAction<boolean>>;
	setIsEditing?: Dispatch<SetStateAction<boolean>>;
}) => {
	const {
		profileImageSrc,
		author,
		diaryId,
		createdAt,
		title,
		content,
		images,
		component,
		setTitle,
		setContent,
		isPublic,
		setIsPublic,
		isEditing,
		setIsEditing,
	} = props;
	const originTitle = title;
	const originContent = content;
	const originIsPublic = isPublic;
	const handleClick = async () => {};

	return (
		<>
			<div className={style.container}>
				<DiaryComponentHeader
					profileImageSrc={profileImageSrc}
					author={author}
					createdAt={createdAt}
					component={component}
				/>
				<DiarySwiper images={images} />
				{isEditing && setTitle ? (
					<DiaryComponentEditTitle title={title} setTitle={setTitle} />
				) : (
					<span className={style.title}>{title}</span>
				)}
				{isEditing && setContent ? (
					<DiaryComponentEditContent content={content} setContent={setContent} />
				) : (
					<span className={style.content}>{content}</span>
				)}
				{isEditing && isPublic !== undefined && setIsPublic && (
					<DiaryComponentEditPublic isPublic={isPublic} setIsPublic={setIsPublic} />
				)}
			</div>
			{isEditing && setIsEditing ? (
				<div className={style.button}>
					<Button
						variant="outlined"
						color="primary"
						onClick={(event: MouseEvent<HTMLButtonElement>) => {
							setTitle(originTitle);
							setContent(originContent);
							setIsPublic(originIsPublic);
							setIsEditing(false);
						}}
					>
						취소
					</Button>
					<Button
						variant="outlined"
						color="primary"
						disabled={!title || title.length < 2 || 10 < title.length}
						onClick={async (event: MouseEvent<HTMLButtonElement>) => {
							await patchFetcher<Diary>(`/diary/${diaryId}`, {
								update: { title, content, isPublic },
								options: { new: true },
							})
								.then((response: Diary) => {
									setIsEditing(false);
									alert('일기 수정이 완료되었습니다.');
								})
								.catch((error: Error) => {
									console.error(error);
									alert('일기 수정에 실패했습니다.');
								});
						}}
					>
						완료
					</Button>
				</div>
			) : null}
		</>
	);
};

export default DiaryComponent;
