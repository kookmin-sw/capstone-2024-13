import Image from 'next/image';
import GoogleLoginButton from '@/component/google-login';
import style from '@/style/app/(public)/auth/login/index.module.css';
import Star from '../../../../../public/image/loginStar.png';

// float 이미지 URL 배열
const images = [
	'/svg/float1.svg',
	'/svg/float2.svg',
	'/svg/float3.svg',
	'/svg/float4.svg',
	'/svg/float5.svg',
	'/svg/float6.svg',
];
const imageStyles = [
	style.float1,
	style.float2,
	style.float3,
	style.float4,
	style.float5,
	style.float6,
];

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
				<div className={style.header}>
					<span className={style.titleChatbot}>챗봇</span>
					<span className={style.titleConversation}>과 대화해요</span>
					<div className={style.titleDescribe}>
						AI가 생성하는 질문과 대화로 <br /> 일기를 쉽고 편리하게 시작하세요.
					</div>
				</div>
				<div className={style.rectangle}>
					<div className={style.text}>
						4가지 테마의 <br /> 다양한 성격
					</div>
					<div className={style.chatbotImages}>
						<Image
							className={`${style.chatbot} ${style.chatbot1}`}
							src={'/svg/chatBot1.svg'}
							alt="chatBot1"
							width={100}
							height={100}
						/>
						<Image
							className={`${style.chatbot} ${style.chatbot2}`}
							src={'/svg/chatBot2.svg'}
							alt="chatBot2"
							width={100}
							height={100}
						/>
						<Image
							className={`${style.chatbot} ${style.chatbot3}`}
							src={'/svg/chatBot3.svg'}
							alt="chatBot3"
							width={100}
							height={100}
						/>
						<Image
							className={`${style.chatbot} ${style.chatbot4}`}
							src={'/svg/chatBot4.svg'}
							alt="chatBot4"
							width={100}
							height={100}
						/>
					</div>
				</div>
				<div className={style.rectangle}>
					<div className={style.text}>
						음성 인식으로 <br /> 간편한 기록
					</div>
					<div className={style.micContainer}>
						<Image
							className={style.mic}
							src={'/svg/mic.svg'}
							alt="mic image"
							width={50}
							height={50}
						/>
						<Image
							className={style.micWave1}
							src={'/svg/micWave1.svg'}
							alt="micWave1"
							width={50}
							height={50}
						/>
						<Image
							className={style.micWave2}
							src={'/svg/micWave2.svg'}
							alt="micWave2"
							width={50}
							height={50}
						/>
						<Image
							className={style.micWave3}
							src={'/svg/micWave3.svg'}
							alt="micWave3"
							width={50}
							height={50}
						/>
					</div>
				</div>
			</div>

			<div className={style.page3}>
				<div className={style.header}>
					<span className={style.titleMarker}>앨범</span>
					<span className={style.titleNormal}>으로 저장해요</span>
					<div className={style.titleDescribe}>
						사진을 첨부하여 그날의 하루를 <br /> 더욱 생생하게 기록하세요.
					</div>
				</div>
				<div className={style.rectangleContainer}>
					<div className={style.rectangle1}></div>
					<div className={style.rectangle2}></div>
					<div className={style.hole1}></div>
					<div className={style.hole2}></div>
					<Image
						className={style.heart}
						src={'/svg/heart.svg'}
						alt="heart"
						width={50}
						height={50}
					/>
				</div>
			</div>

			<div className={style.page4}>
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						key={i}
						className={style.floatingImage}
						style={{
							left: `${Math.random() * 100}vw`,
							animationDelay: `${Math.random() * 3}s`,
							animationDuration: `${Math.random() * 10 + 3}s`,
						}}
					>
						<Image
							src={images[i % images.length]}
							className={imageStyles[i % images.length]}
							alt="Floating image"
							width={50}
							height={50}
						/>
					</div>
				))}
				<div className={style.header}>
					<span className={style.titleNormal}>모두에게</span>
					<span className={style.titleMarker}> 공유</span>
					<span className={style.titleNormal}>해요</span>
					<div className={style.titleDescribe}>
						혼자 알기에 아까운 나의 재미있는 일기를 <br /> 다른 사람들과 공유하세요.
					</div>
				</div>
				<div className={style.foggyBox}></div>
			</div>
			<div className={style.buttonPage}>
				<GoogleLoginButton className={style.loginButton} text="지금 바로 시작" />
			</div>
		</div>
	);
};

export default LoginPage;
