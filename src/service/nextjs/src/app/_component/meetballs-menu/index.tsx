'use client';

import { Dispatch, MouseEvent, ReactNode, SetStateAction, useEffect, useState } from 'react';
import style from '../../_style/component/meetballs-menu/index.module.css';
import { Button } from '@mui/material';

const handleClickOutside = (
	event: globalThis.MouseEvent,
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
		document.addEventListener('click', (event: globalThis.MouseEvent) =>
			handleClickOutside(event, isOpened, setIsOpened),
		);

		return () => {
			document.removeEventListener('click', (event: globalThis.MouseEvent) =>
				handleClickOutside(event, isOpened, setIsOpened),
			);
		};
	}, [isOpened]);

	return (
		<div className={style.container}>
			<Button
				onClick={(event: MouseEvent<HTMLButtonElement>) => {
					event.preventDefault();
					event.stopPropagation();
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
