'use client';

import { useContext, useEffect } from 'react';
import MyPageEditButton from './edit-button';
import MyPageProfile from './profile';
import MyPageLogoutButton from './logout-button';
import MyPageButtonGroup from './button-group';
import HeaderContext from '@/app/_context/header';

const MyPage = () => {
	const { setTitle, setComponent } = useContext(HeaderContext);

	useEffect(() => {
		setTitle('마이페이지');
		setComponent(<MyPageEditButton />);
	}, [setTitle, setComponent]);

	return (
		<>
			<MyPageProfile />
			<MyPageButtonGroup />
			<MyPageLogoutButton />
		</>
	);
};

export default MyPage;
