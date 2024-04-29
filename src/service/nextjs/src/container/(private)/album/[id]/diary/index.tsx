'use client';

import { Types } from 'mongoose';
import { MouseEvent, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import style from '@/style/container/(private)/album/[id]/diary/index.module.css';

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
	createdAt: Date;
	images?: string[];
}) => {
	const { _id, title, content, createdAt } = props;
	const images = props.images?.slice(0, 3) || [];
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [isVertical, setIsVertical] = useState<boolean>(false);

	return (
		<Link
			href={`/album/diary/${_id}`}
			className={style.container}
			onClick={(event: MouseEvent<HTMLAnchorElement>) => event.stopPropagation()}
		>
			<div>
				<span className={style.date}>{ParseDate(new Date(createdAt))}</span>
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
		</Link>
	);
};

export default AlbumPageDiary;
