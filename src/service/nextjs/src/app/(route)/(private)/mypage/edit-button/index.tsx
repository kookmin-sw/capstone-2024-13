import { Button } from '@mui/material';
import style from '../../../../_style/(route)/(private)/mypage/edit-button/index.module.css';
import { MouseEvent } from 'react';

const MyPageEditButton = () => {
	return (
		<div className={style.container}>
			<Button
				variant="outlined"
				color="primary"
				onClick={(event: MouseEvent<HTMLButtonElement>) => {
					event.preventDefault();
					event.stopPropagation();
					alert('수정 버튼 클릭');
				}}
			>
				수정
			</Button>
		</div>
	);
};

export default MyPageEditButton;
