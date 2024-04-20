'use client';

import Button from '@/app/_component/button';
import AuthContext from '@/app/_context/auth';
import { postRegister } from '@/app/_service';
import { Me } from '@/app/_type';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useContext } from 'react';

const handleClick = (
	setMe: Dispatch<SetStateAction<Me | null>>,
	router: AppRouterInstance,
	nickname: string,
	file?: File | null,
) => {
	postRegister({ nickname }, undefined, undefined, file)
		.then(response => {
			setMe(response);
			router.push('/');
			alert('회원가입이 완료되었습니다.');
		})
		.catch(error => {
			console.error(error);
			if (
				error.response &&
				error.response.data.message === 'Failed to register: 400: User already registered'
			) {
				alert('이미 가입된 사용자입니다.');
			}
			router.push('/auth/login');
		});
};

const RegisterButton = (props: { nickname: string; file?: File | null }) => {
	const { nickname, file } = props;
	const { setMe } = useContext(AuthContext);
	const router = useRouter();

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				size="medium"
				onClick={() => handleClick(setMe, router, nickname, file)}
			>
				회원가입
			</Button>
		</div>
	);
};

export default RegisterButton;
