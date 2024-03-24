'use client';

import { AddAPhoto } from '@mui/icons-material';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import style from '../../../_style/component/profile-image/image-selector/index.module.css';

const handleChange = async (
	event: ChangeEvent<HTMLInputElement>,
	setSrc: Dispatch<SetStateAction<string | undefined>>,
	setFile: Dispatch<SetStateAction<File | null>>,
) => {
	const file = event.target.files?.[0];

	if (!file) {
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
				accept="image/*"
				onChange={event => handleChange(event, setSrc, setFile)}
			/>
			<label htmlFor="image-input">
				<AddAPhoto />
			</label>
		</div>
	);
};

export default ImageSelector;
