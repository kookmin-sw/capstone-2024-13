import Button from '@/app/_component/button';
import style from '../../../../_style/(route)/(private)/mypage/logout-button/index.module.css';

const MyPageLogoutButton = () => {
	return (
		<div className={style.container}>
			<Button>로그아웃</Button>
		</div>
	);
};

export default MyPageLogoutButton;
