'use client';

import { TextField } from '@mui/material';
import { ChangeEvent } from 'react';

const RegisterNickname = (props: {
	value: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}) => {
	const { value, onChange } = props;

	return (
		<div>
			<TextField
				label="닉네임"
				variant="outlined"
				value={value}
				onChange={onChange}
				required
				fullWidth
				autoFocus
			/>
		</div>
	);
};

export default RegisterNickname;
