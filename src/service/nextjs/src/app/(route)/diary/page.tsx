'use client';

import Header from '@/app/_component/header';
import style from '../../_style/(route)/diary/index.module.css';
import postConnectMystic from '@/app/_service/postConnectMystic';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

const handleClick = async (router: AppRouterInstance) => {
	const connectionId = await postConnectMystic({ version: 'v3', templateId: '1' }).catch(error => {
		console.error(error);
	});
	router.push(`/diary/${connectionId}`);
};

const DiaryPage = () => {
	const router = useRouter();

	return (
		<div className={style.container}>
			<Header title="일기 테마 선택" />
			<div>
				<Button onClick={() => handleClick(router)}>기본 테마 선택 버튼</Button>
			</div>
		</div>
	);
};

export default DiaryPage;
