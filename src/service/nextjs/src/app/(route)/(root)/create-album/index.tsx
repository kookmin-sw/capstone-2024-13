'use client';

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { Button, TextField } from '@mui/material';
import style from '../../../_style/(route)/(root)/create-album/index.module.css';

const handleSubmit = (title: string) => {
	console.log(title);
};

const CreateAlbum = (props: { setIsOpened: Dispatch<SetStateAction<boolean>> }) => {
	const { setIsOpened } = props;
	//const { setAlbum } = useContext();
	const [title, setTitle] = useState<string>('');

	return (
		<div className={style.container}>
			<div>
				<div className={style.header}>
					<span>새 앨범 만들기</span>
					<span>새 앨범의 제목을 입력해주세요</span>
				</div>
				<TextField
					variant="standard"
					label="제목"
					value={title}
					onChange={event => setTitle(event.target.value)}
					className={style.input}
				/>
				<div className={style.footer}>
					<Button variant="outlined" color="primary" onClick={() => setIsOpened(false)}>
						취소
					</Button>
					<Button
						variant="outlined"
						color="primary"
						disabled={!title}
						onClick={() => handleSubmit(title)}
					>
						생성
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateAlbum;
