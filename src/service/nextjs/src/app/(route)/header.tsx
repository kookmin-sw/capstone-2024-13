'use client';

import style from '@/app/_style/(route)/header.module.css';
import { Menu } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton } from '@mui/material';
import { useState } from 'react';
import HambugerMenu from '../_component/hamburger-menu';

const MainPageHeader = () => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	return (
		<>
			<div className={style.container}>
				<div></div>
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
			{isOpened && (
				<HambugerMenu setIsOpened={setIsOpened} position="right" title="메뉴">
					<div className={style.menu}>
						<ButtonGroup
							orientation="vertical"
							variant="text"
							color="primary"
							arial-label="vertical outlined primary button group"
						>
							<Button key="마이페이지">마이페이지</Button>
							<Button key="나의 일기">나의 일기</Button>
							<Button key="Test1">Test1</Button>
							<Button key="Test2">Test2</Button>
						</ButtonGroup>
					</div>
				</HambugerMenu>
			)}
		</>
	);
};

export default MainPageHeader;
