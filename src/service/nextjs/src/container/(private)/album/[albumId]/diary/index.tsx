'use client';

import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/style/container/(private)/album/[albumId]/diary/index.module.css';
import { Diary } from '@/type';

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

const AlbumPageDiary = (props: { albumId: string; diary: Diary }) => {
	const { albumId, diary } = props;
	const images = diary.images?.slice(0, 3) || [];
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isVertical, setIsVertical] = useState<boolean>(false);

	return (
		<Link
			href={`/album/${albumId}/diary/${diary._id.toString()}`}
			className={style.container}
			onClick={(event: MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
		>
			<div>
				<span className={style.date}>{ParseDate(new Date(diary.createdAt))}</span>
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
				<span>{diary.title}</span>
				<span>{ParseContent(diary.content)}</span>
			</div>
		</Link>
	);
};

export default AlbumPageDiary;
