'use client';

import { useState } from 'react';
import CreateAlbum from '../create-album';
import Button from '@/component/button';
import Modal from '@/component/modal';
import style from '@/style/container/(private)/album/create-album-button/index.module.css';

const CreateAlbumButton = () => {
	const [isOpened, setIsOpened] = useState<boolean>(false);

	return (
		<div className={style.container}>
			<Button variant="outlined" color="primary" onClick={() => setIsOpened(true)}>
				추가
			</Button>
			<Modal isOpened={isOpened} setIsOpened={setIsOpened}>
				<CreateAlbum setIsOpened={setIsOpened} />
			</Modal>
		</div>
	);
};

export default CreateAlbumButton;
