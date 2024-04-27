'use client';

import MyPageEditButton from './edit-button';
import MyPageProfile from './profile';
import MyPageLogoutButton from './logout-button';
import MyPageButtonGroup from './button-group';
import Header from '@/app/_component/header';
import style from '../../../_style/(route)/(private)/mypage/index.module.css';

const MyPage = () => {
	return (
		<>
			<Header title="마이페이지" component={<MyPageEditButton />} />
			<div className={style.container}>
				<MyPageProfile />
				<MyPageButtonGroup />
				<MyPageLogoutButton />
			</div>
		</>
	);
};

export default MyPage;
