'use client';

import { Types } from 'mongoose';
import { useState } from 'react';
import style from '../../../../_style/(route)/album/[id]/diary/index.module.css';
import Image from 'next/image';

const ParseDate = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

	return `${year}. ${month < 10 ? '0' + month : month}. ${
		day < 10 ? '0' + day : day
	}. ${dayOfWeek}`;
};

const ParseContent = (content: string) => {
	const maxLength = 95;
	const contentLength = content.length;

	if (contentLength > maxLength) {
		return content.slice(0, maxLength) + '...';
	}

	return content;
};

const AlbumPageDiary = (props: {
	_id: Types.ObjectId;
	title: string;
	content: string;
	isPublic: boolean;
	createdAt: Date;
	images?: string[];
}) => {
	const { title, content, isPublic, createdAt } = props;
	const images = props.images?.slice(0, 3) || [];
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isVertical, setIsVertical] = useState<boolean>(false);

	return (
		<div className={style.container}>
			<div>
				<span className={style.date}>{ParseDate(new Date(createdAt))}</span>
				{/*<MeetballsMenu width="550cqw">
					<Button>Add to Album</Button>
				</MeetballsMenu>*/}
			</div>
			<>
				{isLoaded && images.length === 3 ? (
					<div
						className={
							style.image +
							' ' +
							style.multiple +
							' ' +
							(isVertical ? style.vertical : style.horizontal)
						}
					>
						{images.map((image, index) => (
							<div key={index}>
								<Image src={image} alt="image" fill sizes="100%" priority />
							</div>
						))}
					</div>
				) : (
					<div className={style.image + ' ' + style.single}>
						<div>
							{images.length && (
								<Image
									src={images[0]}
									alt="image"
									fill
									sizes="100%"
									priority
									onLoad={(event: any) => {
										setIsLoaded(true);
										if (event) {
											if (event.target.naturalWidth === event.target.naturalHeight) {
												setIsVertical(0.5 < Math.random() ? true : false);
												return;
											}
											setIsVertical(event.target.naturalWidth < event.target.naturalHeight);
										}
									}}
								/>
							)}
						</div>
					</div>
				)}
			</>
			<div>
				<span>{title}</span>
				<span>{ParseContent(content)}</span>
			</div>
		</div>
	);
	console.log(isPublic);
};

export default AlbumPageDiary;
