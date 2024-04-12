'use client';

import style from '../../../_style/(route)/(private)/diary/index.module.css';
import DiaryPageStepIndicator from './step-indicator';
import { Button } from '@mui/material';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import DiaryPageThemeSelect from './theme-select';
import DiaryPageImageSelect from './image-select';
import DiaryPageChatInterface from './chat-interface';
import DiaryPageCreating from './creating';
import DiaryPageFinalDraft from './final-draft';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { postCreateDiary } from '@/app/_service/postCreateDiary';
import { getAlbums } from '@/app/_service';
import AlbumContext from '@/app/_context/album';
import { Album } from '@/app/_type';
import HeaderContext from '@/app/_context/header';
import TabBarVisibilityContext from '@/app/_context/tab-bar-visibility';

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
	handleScroll: (currentScrollTop: number, scrollHeight?: number, clientHeight?: number) => void,
	router: AppRouterInstance,
) => {
	postCreateDiary({ title, content, isPublic, images })
		.then(() => {
			getAlbums()
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
	handleScroll(0);
	router.push('/');
};

const handleClick = (
	step: number,
	setStep: Dispatch<SetStateAction<number>>,
	setIsCreating: Dispatch<SetStateAction<boolean>>,
	title: string,
	content: string,
	isPublic: boolean,
	images: string[],
	setAlbums: Dispatch<SetStateAction<Album[]>>,
	handleScroll: (currentScrollTop: number, scrollHeight?: number, clientHeight?: number) => void,
	router: AppRouterInstance,
) => {
	if (step <= 2) {
		handleNextStep(step, setStep);
	} else if (step === 3) {
		handleCreateDiary(step, setStep, setIsCreating);
	} else {
		handleUploadDiary(title, content, isPublic, images, setAlbums, handleScroll, router);
	}
};

const createMockImages = (length: number) => {
	const images = [];
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * 10);

		images.push(`/default-image-0${randomIndex}.png`);
	}
	return images;
};

const StepIndicatorState = [
	{ title: '챗봇 테마 선택', description: '챗봇의 스타일을 선택해주세요.' },
	{ title: '사진 첨부', description: '일기에 첨부할 사진을 선택해주세요.' },
	{ title: '일기 작성', description: '챗봇과 함께 일기를 작성해주세요.' },
	{ title: '최종 수정', description: '작성한 일기를 확인해주세요.' },
];

const DiaryPage = () => {
	const router = useRouter();
	const { setAlbums } = useContext(AlbumContext);
	const [step, setStep] = useState<number>(1);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [theme, setTheme] = useState<string>('hmpark');
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>(
		'content'.repeat(Math.floor(Math.random() * 30) + 1),
	);
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [images, setImages] = useState<string[]>(
		createMockImages(Math.floor(Math.random() * 5) + 1),
	);
	const { setTitle: setHeaderTitle, setComponent: setHeaderComponent } = useContext(HeaderContext);
	const { handleScroll } = useContext(TabBarVisibilityContext);
	const BodyState = [
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

	useEffect(() => {
		setHeaderTitle('일기 작성');
		setHeaderComponent(null);
	}, [setHeaderTitle, setHeaderComponent]);

	return (
		<>
			<DiaryPageStepIndicator current={step} total={4} {...StepIndicatorState[step - 1]} />
			<div
				className={style.container}
				onScroll={event => {
					const div = event.target as HTMLDivElement;

					handleScroll(div.scrollTop, div.scrollHeight, div.clientHeight);
				}}
			>
				{isCreating ? <DiaryPageCreating setContent={setContent} /> : BodyState[step - 1]}
			</div>
			{!isCreating && (
				<Button
					className={style.button}
					onClick={() =>
						handleClick(
							step,
							setStep,
							setIsCreating,
							title,
							content,
							isPublic,
							images,
							setAlbums,
							handleScroll,
							router,
						)
					}
				>
					{step === 4 ? '업로드' : '다음으로'}
				</Button>
			)}
		</>
	);
};

export default DiaryPage;
