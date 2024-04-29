import Button from '@/component/button';
import style from '@/style/container/(private)/mypage/logout-button/index.module.css';

const MyPageLogoutButton = () => {
	return (
		<div className={style.container}>
			<Button>로그아웃</Button>
		</div>
	);
};

export default MyPageLogoutButton;
