'use client';

import { useContext } from 'react';
import style from '../../_style/component/tab-bar/index.module.css';
import AuthContext from '../../_context/auth';
import TabBarButton from './button';
import { Create, Home, Person, Search } from '@mui/icons-material';

const TabBar = () => {
	const { me } = useContext(AuthContext);

	return (
		me && (
			<div className={style.container}>
				<TabBarButton url="/" icon={<Home />} />
				<TabBarButton url="/diary" icon={<Create />} />
				<TabBarButton url="/search" icon={<Search />} />
				<TabBarButton url="/mypage" icon={<Person />} />
			</div>
		)
	);
};

export default TabBar;
