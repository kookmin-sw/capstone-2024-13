'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AlbumDiaryPage = () => {
	const router = useRouter();

	useEffect(() => {
		alert('일기를 찾을 수 없습니다.\n잘못된 접근입니다.');
		router.push('/album');
	}, [router]);

	return null;
};

export default AlbumDiaryPage;
