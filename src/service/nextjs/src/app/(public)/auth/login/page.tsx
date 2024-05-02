import Image from 'next/image';
import GoogleLoginButton from '@/component/google-login';
import style from '@/style/app/(public)/auth/login/index.module.css';
import Star from '../../../../../public/image/loginStar.png';

const LoginPage = () => {
	return (
		<div className={style.container}>
			<div className={style.page1}>
				<div className={style.header}>
					<span className={style.headerText}>아니 근데 오늘 진짜</span>
					<GoogleLoginButton className={style.loginButton} text="로그인" />
				</div>
				<div className={style.centerText}>
					AI에게 말하는
					<br />
					오늘 하루 일기
				</div>
				<div className={style.centerTailText}>간편하게 일기를 시작하세요</div>
				<div className={style.starContainer}>
					{Array.from({ length: 30 }).map((_, i) => (
						<div
							className={style.star}
							key={i}
							style={{
								animationDuration: `${Math.random() * 10 + 3.5}s`,
								animationDelay: `${Math.random() * 2}s`,
								top: `${Math.random() * 100} vh`,
								right: `${Math.random() * 200 + 20}vw`,
								opacity: Math.random() + 0.3, // 별의 투명도를 0.3 ~ 1로 설정
							}}
						>
							<Image src={Star} alt="Falling star" width={14} height={15} />
						</div>
					))}
				</div>
				<div className={style.halfCircle}></div>
				<div className={style.arrow}></div>
				<div className={style.arrowHead}></div>
			</div>

			<div className={style.page2}>
				<h1>페이지 2</h1>
				{/* 여기에 페이지 2의 내용을 추가하세요 */}
			</div>

			<div className={style.page3}>
				<h1>페이지 3</h1>
				{/* 여기에 페이지 3의 내용을 추가하세요 */}
			</div>

			<div className={style.page4}>
				<h1>페이지 4</h1>
				{/* 여기에 페이지 4의 내용을 추가하세요 */}
			</div>
		</div>
	);
};

export default LoginPage;
