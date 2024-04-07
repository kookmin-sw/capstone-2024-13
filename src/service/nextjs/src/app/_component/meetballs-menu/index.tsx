'use client';

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import style from '../../_style/component/meetballs-menu/index.module.css';
import { Button } from '@mui/material';

const handleClickOutside = (
	event: MouseEvent,
	isOpened: boolean,
	setIsOpened: Dispatch<SetStateAction<boolean>>,
) => {
	const target = event.target as HTMLElement;
	const menu = target.closest(`.${style.menu}`);

	if (isOpened && !menu) {
		setIsOpened(false);
	}
};

const MeetballsMenu = (props: { width?: number | string; children?: ReactNode }) => {
	const { width, children } = props;
	const [isOpened, setIsOpened] = useState<boolean>(false);

	useEffect(() => {
		document.addEventListener('click', event => handleClickOutside(event, isOpened, setIsOpened));

		return () => {
			document.removeEventListener('click', event =>
				handleClickOutside(event, isOpened, setIsOpened),
			);
		};
	}, []);

	return (
		<div className={style.container}>
			<Button
				onClick={() => {
					setIsOpened(!isOpened);
				}}
			>
				···
			</Button>
			{isOpened && (
				<div className={style.menu} style={{ width }}>
					{children}
				</div>
			)}
		</div>
	);
};

export default MeetballsMenu;
