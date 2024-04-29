'use client';

import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { AddAPhoto } from '@mui/icons-material';
import style from '@/style/component/profile-image/image-selector/index.module.css';

const isValidFileType = (type: string) => {
	const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
	return allowedTypes.includes(type);
};

const handleChange = async (
	event: ChangeEvent<HTMLInputElement>,
	setSrc: Dispatch<SetStateAction<string | undefined>>,
	setFile: Dispatch<SetStateAction<File | null>>,
) => {
	const file = event.target.files?.[0];

	if (!file) {
		return;
	}

	if (!isValidFileType(file.type)) {
		alert('Invalid file type');
		return;
	}

	setSrc(URL.createObjectURL(file));
	setFile(file);
};

const ImageSelector = (props: {
	setSrc: Dispatch<SetStateAction<string | undefined>>;
	setFile: Dispatch<SetStateAction<File | null>>;
}) => {
	const { setSrc, setFile } = props;

	return (
		<div className={style.container}>
			<input
				id="image-input"
				type="file"
				accept="image/jpeg, image/jpg, image/png"
				onChange={event => handleChange(event, setSrc, setFile)}
			/>
			<label htmlFor="image-input">
				<AddAPhoto />
			</label>
		</div>
	);
};

export default ImageSelector;
