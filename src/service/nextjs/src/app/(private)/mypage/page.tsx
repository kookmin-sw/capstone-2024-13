'use client';

import Header from '@/component/header';
import MyPageButtonGroup from '@/container/(private)/mypage/button-group';
import MyPageEditButton from '@/container/(private)/mypage/edit-button';
import MyPageLogoutButton from '@/container/(private)/mypage/logout-button';
import MyPageProfile from '@/container/(private)/mypage/profile';
import style from '@/style/app/(private)/mypage/index.module.css';

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
