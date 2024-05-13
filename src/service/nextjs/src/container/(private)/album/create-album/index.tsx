'use client';

import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from 'react';
import { FormControl, FormHelperText, Input, InputLabel, TextField } from '@mui/material';
import { Album } from '@/type';
import { postCreateAlbum } from '@/service';
import AlbumContext from '@/context/album';
import Button from '@/component/button';
import style from '@/style/container/(private)/album/create-album/index.module.css';
import { Close } from '@mui/icons-material';

const handleSubmit = async (
	title: string,
	albums: Album[],
	setAlbums: Dispatch<SetStateAction<Album[]>>,
	setIsOpened: Dispatch<SetStateAction<boolean>>,
) => {
	await postCreateAlbum({ title })
		.then(response => {
			setAlbums([...albums, response]);
		})
		.catch(error => {
			console.error(error);
		});
	setIsOpened(false);
};

const CreateAlbum = (props: { setIsOpened: Dispatch<SetStateAction<boolean>> }) => {
	const { setIsOpened } = props;
	const { albums, setAlbums } = useContext(AlbumContext);
	const [title, setTitle] = useState<string>('');

	return (
		<div className={style.container}>
			<div>
				<div className={style.header}>
					<span>새 앨범</span>
					<span>새 앨범의 이름을 입력해주세요</span>
				</div>
				<FormControl variant="standard" className={style.form}>
					<InputLabel htmlFor="name">이름</InputLabel>
					<Input
						id="name"
						type="text"
						value={title}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							if (11 < event.target.value.length) {
								return;
							}
							setTitle(event.target.value);
						}}
						endAdornment={<Close fontSize="small" onClick={() => setTitle('')} />}
						aria-describedby="name-helper-text"
					/>
					<FormHelperText
						id="name-helper-text"
						error={title && (title?.length < 2 || 10 < title?.length)}
					>
						{title && title.length < 2
							? '이름은 2자 이상 입력해주세요.'
							: 10 < title?.length
							? '이름은 10자 이하로 입력해주세요.'
							: ''}
					</FormHelperText>
				</FormControl>
				<div className={style.footer}>
					<Button variant="outlined" color="primary" onClick={() => setIsOpened(false)}>
						취소
					</Button>
					<Button
						variant="outlined"
						color="primary"
						disabled={!title || title?.length < 2 || 10 < title?.length}
						onClick={() => handleSubmit(title, albums, setAlbums, setIsOpened)}
					>
						완료
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreateAlbum;
