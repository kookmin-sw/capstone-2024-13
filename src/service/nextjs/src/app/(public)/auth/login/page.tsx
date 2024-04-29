import Image from 'next/image';
import GoogleLoginButton from '@/component/google-login';
import style from '@/style/app/(public)/auth/login/index.module.css';

const LoginPage = () => {
	return (
		<div className={style.container}>
			<Image
				src="/image/you-know-what.png"
				alt="You know what"
				width={1025}
				height={488}
				priority={true}
			/>
			<GoogleLoginButton width={'63cqw'} height={'11cqw'} />
		</div>
	);
};

export default LoginPage;
