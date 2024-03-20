'use client';

import AuthContext from '@/app/_context/auth';
import { postFetcher } from '@/app/_service/api';
import { Me } from '@/app/_type';
import { Button } from '@mui/material';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter } from 'next/navigation';
import { Dispatch, MouseEvent, SetStateAction, useContext } from 'react';

const handleClick = (
	event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
	nickname: string,
	setMe: Dispatch<SetStateAction<Me | null>>,
	router: AppRouterInstance,
	src?: string,
) => {
	event.preventDefault();

	postFetcher<Me>('/auth/register', { nickname })
		.then(response => {
			setMe(response);
			router.push('/');
			alert('회원가입이 완료되었습니다.');
		})
		.catch(error => {
			if (error.response.data.message === 'Failed to register: 400: User already registered') {
				alert('이미 가입된 사용자입니다.');
				router.push('/auth/login');
			}
			console.error(error);
		});
};

const RegisterButton = (props: { src?: string; nickname: string }) => {
	const { src, nickname } = props;
	const { setMe } = useContext(AuthContext);
	const router = useRouter();

	return (
		<div>
			<Button
				variant="contained"
				color="primary"
				size="medium"
				onClick={event => handleClick(event, nickname, setMe, router, src)}
			>
				회원가입
			</Button>
		</div>
	);
};

export default RegisterButton;
