'use client';

import style from '../../_style/component/profile-image/index.module.css';
import { Avatar, Badge } from '@mui/material';
import { Dispatch, SetStateAction } from 'react';
import ImageSelector from './image-selector';

const ProfileImage = (props: {
	width?: number | string;
	height?: number | string;
	src?: string | undefined;
	setSrc?: Dispatch<SetStateAction<string | undefined>>;
	setFile?: Dispatch<SetStateAction<File | null>>;
}) => {
	const width = props.width || '100%';
	const height = props.height || '100%';
	const src =
		`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${props.src}` || '/default-profile-image.png';
	const { setSrc, setFile } = props;

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
			>
				<Avatar alt="Profile image" src={src} />
			</Badge>
		</div>
	);
};

export default ProfileImage;
