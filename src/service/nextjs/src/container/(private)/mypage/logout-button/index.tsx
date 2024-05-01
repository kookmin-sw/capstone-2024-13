import Button from '@/component/button';
import style from '@/style/container/(private)/mypage/logout-button/index.module.css';
import { postLogout } from '@/service';

const MyPageLogoutButton = () => {
	const handleClick = async () => {
		console.log('로그아웃 버튼이 클릭되었습니다.');
		try {
			await postLogout();
			console.log('로그아웃 성공');
			window.location.reload(); // 페이지 새로고침
		} catch (error) {
			console.error('로그아웃에 실패했습니다.', error);
		}
	};

	return (
		<div className={style.container}>
			<Button onClick={handleClick}>로그아웃</Button>
		</div>
	);
};

export default MyPageLogoutButton;
