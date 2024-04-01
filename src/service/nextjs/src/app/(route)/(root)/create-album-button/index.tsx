'use client';

import { Button } from '@mui/material';
import style from '../../../_style/(route)/(root)/create-album-button/index.module.css';

const CreateAlbumButton = () => {
	return (
		<div className={style.container}>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => {
					alert('앨범 생성 버튼 클릭');
				}}
			>
				추가
			</Button>
		</div>
	);
};

export default CreateAlbumButton;
