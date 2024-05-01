'use client';

import { Avatar, Badge } from '@mui/material';
import { Dispatch, MouseEvent, SetStateAction, useEffect, useState } from 'react';
import ImageSelector from './image-selector';
import style from '@/style/component/profile-image/index.module.css';

const ProfileImage = (props: {
	width?: number | string;
	height?: number | string;
	src?: string | undefined;
	setSrc?: Dispatch<SetStateAction<string | undefined>>;
	setFile?: Dispatch<SetStateAction<File | null>>;
}) => {
	const width = props.width || '100%';
	const height = props.height || '100%';
	const src = props.src || '/image/default-image-00.png';
	const { setSrc, setFile } = props;
	const [hashedSrc, setHashedSrc] = useState<string | undefined>(src);
	const [isError, setIsError] = useState<boolean>(false);

	useEffect(() => {
		let intervalId: NodeJS.Timeout | undefined = undefined;

		if (isError && !intervalId) {
			intervalId = setInterval(() => {
				setHashedSrc(`${src}#${Date.now()}`);
			}, 500);
		} else if (!isError && intervalId) {
			clearInterval(intervalId);
		} else {
			setHashedSrc(src);
		}

		return () => {
			if (intervalId) {
				clearInterval(intervalId);
			}
		};
	}, [src, isError, setHashedSrc]);

	return (
		<div style={{ width, height }} className={style.container}>
			<Badge
				overlap="circular"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				badgeContent={
					setSrc && setFile ? (
						<Avatar alt="Add a photo">
							<ImageSelector setSrc={setSrc} setFile={setFile} />
						</Avatar>
					) : null
				}
				onClick={(event: MouseEvent<HTMLSpanElement>) => event.stopPropagation()}
			>
				<Avatar
					alt="Profile image"
					src={hashedSrc}
					onError={() => setIsError(true)}
					onLoad={() => setIsError(false)}
				/>
			</Badge>
		</div>
	);
};

export default ProfileImage;
