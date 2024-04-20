'use client';

import style from '../../_style/component/meetballs-menu/index.module.css';
import Button from '../button';
import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import { ButtonGroup } from '@mui/material';

const MeetballsMenu = (props: {
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	width?: number | string;
	children?: ReactNode;
}) => {
	const { isOpened, setIsOpened, width, children } = props;

	return (
		<div className={style.container}>
			<Button onClick={() => setIsOpened(!isOpened)}>···</Button>
			{isOpened && (
				<ButtonGroup className={style.menu} style={{ width }} orientation="vertical" variant="text">
					{children}
				</ButtonGroup>
			)}
			{isOpened && (
				<div
					className={style.background}
					onClick={(event: MouseEvent<HTMLDivElement>) => {
						event.preventDefault();
						event.stopPropagation();
						setIsOpened(false);
					}}
				></div>
			)}
		</div>
	);
};

export default MeetballsMenu;
