import { Button } from '@mui/material';
import style from '../../../../_style/(route)/(private)/mypage/edit-button/index.module.css';

const MyPageEditButton = () => {
	return (
		<div className={style.container}>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => {
					alert('수정 버튼 클릭');
				}}
			>
				수정
			</Button>
		</div>
	);
};

export default MyPageEditButton;
