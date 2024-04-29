'use client';

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Album } from '@/type';
import { getAlbum, postCreateDiary } from '@/service';
import AlbumContext from '@/context/album';
import DiaryPageThemeSelect from '@/container/(private)/diary/theme-select';
import DiaryPageImageSelect from '@/container/(private)/diary/image-select';
import DiaryPageChatInterface from '@/container/(private)/diary/chat-interface';
import DiaryPageFinalDraft from '@/container/(private)/diary/final-draft';
import Header from '@/component/header';
import DiaryPageStepIndicator from '@/container/(private)/diary/step-indicator';
import DiaryPageCreating from '@/container/(private)/diary/creating';
import Button from '@/component/button';
import style from '@/style/app/(private)/diary/index.module.css';

const handleNextStep = (step: number, setStep: Dispatch<SetStateAction<number>>) => {
	setStep(step + 1);
};

const handleCreateDiary = (
	step: number,
	setStep: Dispatch<SetStateAction<number>>,
	setIsCreating: Dispatch<SetStateAction<boolean>>,
) => {
	setIsCreating(true);
	setTimeout(() => {
		setIsCreating(false);
		setStep(step + 1);
	}, 3000);
};

const handleUploadDiary = (
	title: string,
	content: string,
	isPublic: boolean,
	images: string[],
	setAlbums: Dispatch<SetStateAction<Album[]>>,
	router: AppRouterInstance,
) => {
	postCreateDiary({ title, content, isPublic, images })
		.then(() => {
			getAlbum()
				.then((albums: Album[]) => {
					setAlbums(albums);
				})
				.catch((error: Error) => {
					console.error(error);
				});
		})
		.catch((error: Error) => {
			console.error(error);
		});
	router.push('/');
};

const createMockImages = (length: number) => {
	const images = [];
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * 10);

		images.push(`/image/default-image-0${randomIndex}.png`);
	}
	return images;
};

const indicatorProps = [
	{ title: '챗봇 테마 선택', description: '챗봇의 스타일을 선택해주세요.' },
	{ title: '사진 첨부', description: '일기에 첨부할 사진을 선택해주세요.' },
	{ title: '일기 작성', description: '챗봇과 함께 일기를 작성해주세요.' },
	{ title: '최종 수정', description: '작성한 일기를 확인해주세요.' },
];

const DiaryPage = () => {
	const router = useRouter();
	const { setAlbums } = useContext(AlbumContext);
	const [step, setStep] = useState<number>(0);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [theme, setTheme] = useState<string>('');
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>(
		'content'.repeat(Math.floor(Math.random() * 30) + 1),
	);
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [images, setImages] = useState<string[]>(
		createMockImages(Math.floor(Math.random() * 5) + 1),
	);
	const diaryPageComponents = [
		<DiaryPageThemeSelect key={1} theme={theme} setTheme={setTheme} />,
		<DiaryPageImageSelect key={2} images={images} setImages={setImages} />,
		<DiaryPageChatInterface key={3} />,
		<DiaryPageFinalDraft
			key={4}
			title={title}
			setTitle={setTitle}
			content={content}
			setContent={setContent}
			images={images}
			isPublic={isPublic}
			setIsPublic={setIsPublic}
		/>,
	];
	const handlers = [
		() => handleNextStep(step, setStep),
		() => handleNextStep(step, setStep),
		() => handleCreateDiary(step, setStep, setIsCreating),
		() =>
			handleUploadDiary(title, content, isPublic, images, setAlbums, router as AppRouterInstance),
	];

	return (
		<div className={style.container}>
			<Header title="일기 작성" />
			<DiaryPageStepIndicator current={step + 1} total={4} {...indicatorProps[step]} />
			{isCreating ? <DiaryPageCreating setContent={setContent} /> : diaryPageComponents[step]}
			{!isCreating && (
				<Button className={style.button} onClick={handlers[step]}>
					{step === 4 ? '업로드' : '다음으로'}
				</Button>
			)}
		</div>
	);
};

export default DiaryPage;
