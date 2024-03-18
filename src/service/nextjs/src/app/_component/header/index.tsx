'use client';

import style from '../../_style/component/header/index.module.css';
import { Menu } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useState } from 'react';
import HambugerMenu from '../hamburger-menu';
import AuthContext from '../../_context/auth';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Title: { [key: string]: string } = {
	'/chat': '일기',
	'/diary': '나의 일기',
	'/mypage': '내 정보',
	'/test1': 'Test1',
	'/test2': 'Test2',
};

const RouteButton = (props: {
	pathname: string;
	title: string;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { pathname, title, setIsOpened } = props;

	return (
		<Button
			key={title}
			onClick={() => {
				setTimeout(() => {
					setIsOpened(false);
				}, 150);
			}}
		>
			<Link href={pathname}>{title}</Link>
		</Button>
	);
};

const Header = () => {
	const { me } = useContext(AuthContext);
	const pathname = usePathname();
	const [isOpened, setIsOpened] = useState<boolean>(false);

	return (
		<>
			<div className={style.container}>
				{me && !pathname.startsWith('/auth') && (
					<>
						<div></div>
						<div>
							<div>
								<div>
									<span>{Title[pathname]}</span>
								</div>
								<div>
									<IconButton
										aria-label="menu"
										color="inherit"
										size="large"
										onClick={() => setIsOpened(true)}
									>
										<Menu fontSize="large" />
									</IconButton>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
			{isOpened && (
				<HambugerMenu setIsOpened={setIsOpened} position="right" title="메뉴">
					<div className={style.menu}>
						<ButtonGroup
							orientation="vertical"
							variant="text"
							color="primary"
							arial-label="vertical outlined primary button group"
						>
							<RouteButton pathname="/" title="메인페이지" setIsOpened={setIsOpened} />
							<RouteButton pathname="/diary" title="나의 일기" setIsOpened={setIsOpened} />
							<RouteButton pathname="/mypage" title="내 정보" setIsOpened={setIsOpened} />
							<RouteButton pathname="/test1" title="Test1" setIsOpened={setIsOpened} />
							<RouteButton pathname="/test2" title="Test2" setIsOpened={setIsOpened} />
						</ButtonGroup>
					</div>
				</HambugerMenu>
			)}
		</>
	);
};

export default Header;
