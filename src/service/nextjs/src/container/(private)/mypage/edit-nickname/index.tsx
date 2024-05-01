import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { FormControl, FormHelperText, Input, InputLabel } from '@mui/material';
import style from '@/style/container/(private)/mypage/edit-nickname/index.module.css';
import { Close } from '@mui/icons-material';

const MyPageEditNickname = (props: {
	nickname: string | undefined;
	setNickname: Dispatch<SetStateAction<string | undefined>>;
}) => {
	const { nickname, setNickname } = props;

	return (
		<FormControl variant="standard" className={style.container}>
			<InputLabel htmlFor="nickname">닉네임</InputLabel>
			<Input
				id="nickname"
				type="text"
				value={nickname}
				onClick={(event: MouseEvent<HTMLInputElement>) => event.stopPropagation()}
				onChange={(event: ChangeEvent<HTMLInputElement>) => {
					if (13 < event.target.value.length) {
						return;
					}
					setNickname(event.target.value);
				}}
				endAdornment={<Close fontSize="small" onClick={() => setNickname('')} />}
				aria-describedby="nickname-helper-text"
			/>
			<FormHelperText
				id="nickname-helper-text"
				error={!nickname || nickname?.length < 2 || 12 < nickname?.length}
			>
				{!nickname
					? '닉네임을 입력해주세요.'
					: nickname?.length < 2
					? '닉네임은 2자 이상 입력해주세요.'
					: 12 < nickname?.length
					? '닉네임은 12자 이하로 입력해주세요.'
					: ''}
			</FormHelperText>
		</FormControl>
	);
};

export default MyPageEditNickname;
