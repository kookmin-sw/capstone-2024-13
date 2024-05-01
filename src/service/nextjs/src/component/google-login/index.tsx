import GoogleLogo from './icon';
import Link from 'next/link';
import style from '@/style/component/google-login/index.module.css';

const GoogleLoginButton = (props: {
	text?: string;
	width?: number | string;
	height?: number | string;
	className?: string;
}) => {
	const text = props.text || 'Google 계정으로 로그인하기';
	const width = props.width || '100%';
	const height = props.height || '100%';
	const className = props.className || style.container;

	return (
		<Link
			href={`${process.env.NEXT_PUBLIC_API_URL}/auth/google`}
			// style={{ width, height }}
			className={className}
		>
			<div>
				<span>{text}</span>
			</div>
		</Link>
	);
};

export default GoogleLoginButton;
