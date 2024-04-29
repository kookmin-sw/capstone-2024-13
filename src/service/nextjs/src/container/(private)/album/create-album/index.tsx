'use client';

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { TextField } from '@mui/material';
import { Album } from '@/type';
import { postCreateAlbum } from '@/service';
import AlbumContext from '@/context/album';
import Button from '@/component/button';
import style from '@/style/container/(private)/album/create-album/index.module.css';

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
				<TextField
					variant="filled"
					label="이름"
					required
					size="small"
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
