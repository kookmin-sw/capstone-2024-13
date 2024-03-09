'use client';

import style from '../../_style/component/profile-image/index.module.css';
import { AddAPhoto } from '@mui/icons-material';
import { Avatar, Badge } from '@mui/material';

const ProfileImage = (props: {
	src?: string;
	width?: number | string;
	height?: number | string;
}) => {
	const src = props.src || '/default_profile_image.png';
	const width = props.width || '100%';
	const height = props.height || '100%';

	return (
		<div style={{ width, height }} className={style.container}>
			<Badge
				overlap="circular"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				badgeContent={
					<Avatar alt="Add a photo" onClick={() => alert('Add a photo')}>
						<AddAPhoto />
					</Avatar>
				}
			>
				<Avatar alt="Profile image" src={src} />
			</Badge>
		</div>
	);
};

export default ProfileImage;
