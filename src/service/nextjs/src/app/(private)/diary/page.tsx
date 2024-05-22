'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Album } from '@/type';
import { getAlbums, postConnectMystic, postCreateDiary } from '@/service';
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
import { Types } from 'mongoose';
import { AxiosError } from 'axios';
import { postUploadImage } from '@/service';
import { postFetcher } from '@/service/api';

const DiaryPage = () => {
	const router = useRouter();
	const { setAlbums } = useContext(AlbumContext);
	const [step, setStep] = useState<number>(0);
	const [connectionId, setConnectionId] = useState<Types.ObjectId | null>(null);
	const [isCreating, setIsCreating] = useState<boolean>(false);
	const [theme, setTheme] = useState<number | null>(null);
	const [title, setTitle] = useState<string>('');
	const [content, setContent] = useState<string>('');
	const [isPublic, setIsPublic] = useState<boolean>(false);
	const [images, setImages] = useState<string[]>([]);
	const [files, setFiles] = useState<File[]>([]);
	const [messages, setMessages] = useState<string[]>([]);

	const indicatorProps = [
		{ title: '챗봇 테마 선택', description: '챗봇의 스타일을 선택해주세요.' },
		{ title: '사진 첨부', description: '일기에 첨부할 사진을 선택해주세요.' },
		{ title: '일기 작성', description: '챗봇과 함께 일기를 작성해주세요.' },
		{ title: '최종 수정', description: '작성한 일기를 확인해주세요.' },
	];
	const diaryPageComponents = [
		<DiaryPageThemeSelect key={1} theme={theme} setTheme={setTheme} />,
		<DiaryPageImageSelect key={2} images={images} setImages={setImages} setFiles={setFiles} />,
		<DiaryPageChatInterface
			key={3}
			theme={theme}
			connectionId={connectionId}
			messages={messages}
			setMessages={setMessages}
			setIsCreating={setIsCreating}
		/>,
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
		async () => {
			if (theme === null) {
				alert('테마를 선택해주세요.');
				return;
			}

			await postConnectMystic('v3', theme)
				.then((response: Types.ObjectId) => {
					setConnectionId(response['connection_id']);
					setStep(step + 1);
				})
				.catch((error: Error) => {
					console.error(error);
					alert('테마 선택에 실패했습니다.');
				});
		},
		async () => {
			const newImages = [];
			if (files.length) {
				for (const file of files) {
					const image = await postUploadImage('diary', file).catch((error: AxiosError) => {
						console.error(error);
						return '';
					});
					if (image === '') {
						setImages([]);
						alert('이미지 업로드에 실패했습니다.');
						return;
					}
					newImages.push(`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/w512/diary/${image}`);
				}
			}

			const url = newImages.length ? newImages[0] : undefined;

			await postFetcher<{ content: string }>('/mystic/image/upload', { connectionId, url })
				.then((response: { content: string }) => {
					setStep(step + 1);
					setMessages([response.content]);
					setImages(newImages);
				})
				.catch((error: AxiosError) => {
					console.error(error);
					alert('이미지 업로드에 실패했습니다.');
				});
		},
		async () => {
			setIsCreating(true);
		},
		async () => {
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
			router.push('/album');
		},
	];

	useEffect(() => {
		if (isCreating) {
			postFetcher<{ content: string }>('/mystic/chat/summary', {
				connectionId,
			})
				.then((response: { content: string }) => {
					setContent(response.content);
					postFetcher<{ content: string }>('/mystic/disconnect', {
						connectionId,
					})
						.then((response: { content: string }) => {
							setIsCreating(false);
							setStep(step + 1);
						})
						.catch((error: AxiosError) => {
							console.error(error);
						});
				})
				.catch((error: AxiosError) => {
					console.error(error);
				});
		}
	}, [isCreating, connectionId, step]);

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
