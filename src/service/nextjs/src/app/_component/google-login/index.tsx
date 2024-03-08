import style from '@/app/_style/component/google-login/index.module.css';
import GoogleLogo from './icon';
import Link from 'next/link';

const GoogleLoginButton = (props: {
	text?: string;
	width?: number | string;
	height?: number | string;
}) => {
	const text = props.text || 'Google 계정으로 로그인하기';
	const width = props.width || '100%';
	const height = props.height || '100%';

	return (
		<Link
			href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
			style={{ width, height }}
			className={style.container}
		>
			<GoogleLogo />
			<div>
				<span>{text}</span>
			</div>
		</Link>
	);
};

export default GoogleLoginButton;
