'use client';

import { Create, Home, Person, Search } from '@mui/icons-material';
import { useContext } from 'react';
import TabBarButton from './button';
import AuthContext from '@/context/auth';
import style from '@/style/component/tab-bar/index.module.css';

const TabBar = (props: { isVisible: boolean }) => {
	const { isVisible } = props;
	const { me } = useContext(AuthContext);

	return (
		me && (
			<div className={style.container + ' ' + (isVisible ? style.visible : style.hidden)}>
				<TabBarButton url="/album" icon={<Home />} />
				<TabBarButton url="/diary" icon={<Create />} />
				<TabBarButton url="/search" icon={<Search />} />
				<TabBarButton url="/mypage" icon={<Person />} />
			</div>
		)
	);
};

export default TabBar;
