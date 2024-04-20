import { Dispatch, ReactNode, SetStateAction } from 'react';
import style from '../../_style/component/diary/index.module.css';
import DiarySwiper from './swiper';
import DiaryComponentEditContent from './edit-content';
import DiaryComponentEditTitle from './edit-title';
import DiaryComponentEditPublic from './edit-public';
import DiaryComponentHeader from './header';

const DiaryComponent = (props: {
	profileImageSrc: string;
	author: string;
	createdAt: Date;
	title: string;
	content: string;
	images?: string[];
	component?: ReactNode;
	setTitle?: Dispatch<SetStateAction<string>>;
	setContent?: Dispatch<SetStateAction<string>>;
	isPublic?: boolean;
	setIsPublic?: Dispatch<SetStateAction<boolean>>;
	isEditing?: boolean;
	setIsEditing?: Dispatch<SetStateAction<boolean>>;
}) => {
	const {
		profileImageSrc,
		author,
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
	return (
		<div className={style.container}>
			<DiaryComponentHeader createdAt={createdAt} component={component} />
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
	);
};

export default DiaryComponent;
