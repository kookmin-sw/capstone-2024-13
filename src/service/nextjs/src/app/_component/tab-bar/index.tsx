'use client';

import { Create, Home, Person, Search } from '@mui/icons-material';
import { useContext } from 'react';
import style from '../../_style/component/tab-bar/index.module.css';
import AuthContext from '../../_context/auth';
import TabBarButton from './button';

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
