'use client';

import { useRouter } from 'next/navigation';

const LoginCallbackPage = () => {
	const router = useRouter();
	router.push('/album');
	return null;
};

export default LoginCallbackPage;
