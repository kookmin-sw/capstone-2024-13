'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import style from '../../../../_style/(route)/diary/preview/image/index.module.css';
import Image from 'next/image';

const DiaryPreviewImage = (props: {
	src: string;
	isColumnDirection: boolean;
	setIsColumnDirection: Dispatch<SetStateAction<boolean>>;
}) => {
	const { src, isColumnDirection, setIsColumnDirection } = props;
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	return (
		<div
			className={
				isLoaded ? (isColumnDirection ? style.vertical : style.horizontal) : style.container
			}
		>
			<Image
				src={src}
				alt="diary-image"
				fill
				priority
				sizes="100cqw"
				onLoad={(event: any) => {
					if (event.target) {
						setIsColumnDirection(event.target.naturalWidth < event.target.naturalHeight);
					}
					setIsLoaded(true);
				}}
			/>
		</div>
	);
};

export default DiaryPreviewImage;
