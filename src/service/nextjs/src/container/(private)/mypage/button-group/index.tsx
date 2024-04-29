import Button from '@/component/button';
import style from '@/style/container/(private)/mypage/button-group/index.module.css';

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
