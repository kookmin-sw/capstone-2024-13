'use client';

import { postLogout } from '@/service';
import { useRouter } from 'next/navigation';
import Button from '@/component/button';
import style from '@/style/container/(private)/mypage/logout-button/index.module.css';
import { useContext } from 'react';
import AuthContext from '@/context/auth';

const MyPageLogoutButton = () => {
	const router = useRouter();
	const { setMe } = useContext(AuthContext);

	const handleClick = async () =>
		await postLogout()
			.then(() => {
				setMe(null);
				router.push('/auth/login');
			})
			.catch((error: Error) => {
				console.error(error);
				alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
			});

	return (
		<div className={style.container}>
			<Button onClick={handleClick}>로그아웃</Button>
		</div>
	);
};

export default MyPageLogoutButton;
