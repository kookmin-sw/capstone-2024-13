'use client';

import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import style from '@/app/_style/component/hamburger-menu/index.module.css';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

const HambugerMenu = (props: {
	setIsOpened: Dispatch<SetStateAction<boolean>>;
	position: 'left' | 'right';
	children: ReactNode;
	title?: string;
}) => {
	const { setIsOpened, position, children, title } = props;
	const [isLoaded, setIsLoaded] = useState<boolean>(false);

	useEffect(() => {
		setIsLoaded(true);
	}, []);

	return (
		isLoaded &&
		createPortal(
			<div className={style.container} onClick={() => setIsOpened(false)}>
				<div
					onClick={event => event.stopPropagation()}
					style={{ margin: position === 'left' ? '0 auto 0 0' : '0 0 0 auto' }}
				>
					<div className={style.header}>
						<span>{title}</span>
						<IconButton
							aria-label="close"
							color="inherit"
							size="large"
							onClick={() => setIsOpened(false)}
						>
							<Close fontSize="inherit" />
						</IconButton>
					</div>
					<div>{children}</div>
				</div>
			</div>,
			(document.body.lastChild as Element).firstChild as Element,
		)
	);
};

export default HambugerMenu;
