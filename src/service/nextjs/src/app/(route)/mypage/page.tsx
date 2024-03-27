'use client';

import style from '../../_style/(route)/mypage/index.module.css';
import Header from '@/app/_component/header';
import MyPageEditButton from './edit-button';
import MyPageProfile from './profile';
import MyPageLogoutButton from './logout-button';
import MyPageButtonGroup from './button-group';

const MyPage = () => {
	return (
		<div className={style.container}>
			<Header title="마이페이지" component={<MyPageEditButton />} />
			<div>
				<MyPageProfile />
				<MyPageButtonGroup />
				<MyPageLogoutButton />
			</div>
		</div>
	);
};

export default MyPage;
