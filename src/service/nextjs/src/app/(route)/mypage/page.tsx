'use client';

import { useContext } from 'react';
import style from '../../_style/(route)/mypage/index.module.css';
import AuthContext from '@/app/_context/auth';
import ProfileImage from '@/app/_component/profile-image';
import { Button } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';

const MyPage = () => {
	const { me } = useContext(AuthContext);

	return (
		<div className={style.container}>
			<div className={style.profile}>
				<div>
					<ProfileImage src={me?.profileImageId?.toString()} />
				</div>
				<span>{me?.nickname}</span>
			</div>
			<div className={style.edit}>
				<Button variant="outlined" color="primary">
					수정하기
				</Button>
			</div>
			<div className={style.email}>
				<div>
					<EmailOutlined />
					<span>Email</span>
				</div>
				<div>
					<span>{me?.email}</span>
				</div>
			</div>
		</div>
	);
};

export default MyPage;
