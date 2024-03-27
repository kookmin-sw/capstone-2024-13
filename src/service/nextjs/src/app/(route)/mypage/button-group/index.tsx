import style from '../../../_style/(route)/mypage/button-group/index.module.css';
import { Button, ButtonGroup } from '@mui/material';

const MyPageButtonGroup = () => {
	return (
		<div className={style.container}>
			<Button>1:1문의사항</Button>
			<Button>TEST1</Button>
			<Button>TEST2</Button>
		</div>
	);
};

export default MyPageButtonGroup;
