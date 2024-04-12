'use client';

import { Button } from '@mui/material';
import { useState } from 'react';
import style from '../../../../_style/(route)/(private)/album/create-album-button/index.module.css';
import Modal from '@/app/_component/modal';
import CreateAlbum from '../create-album';

const CreateAlbumButton = () => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	return (
		<div className={style.container}>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => {
					setIsOpened(true);
				}}
			>
				추가
			</Button>
			<Modal isOpened={isOpened} setIsOpened={setIsOpened}>
				<CreateAlbum setIsOpened={setIsOpened} />
			</Modal>
		</div>
	);
};

export default CreateAlbumButton;
