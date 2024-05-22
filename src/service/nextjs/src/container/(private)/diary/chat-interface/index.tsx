'use client';

import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '@/context/auth';
import Chat from '@/component/chat';
import style from '@/style/container/(private)/diary/chat-interface/index.module.css';
import AudioRecorder from '@/component/audio-recorder';
import { postFetcher } from '@/service/api';
import { Types } from 'mongoose';

type ThemeType = {
	id: number;
	name: string;
	description: string;
	src?: string;
	audio?: string;
};

const themes: ThemeType[] = [
	{
		id: 0,
		name: '박하명',
		description: '게임 매니아 교수',
		src: '/image/Park.png',
	},
	{ id: 1, name: '이상환', description: '자상한 교수', src: '/image/Lee.png' },
	{ id: 2, name: '이영지', description: 'MZ 대통령', src: '/image/Young.png' },
	{ id: 3, name: '짱구', description: '장난꾸러기', src: '/image/Shin.png' },
];

const DiaryPageChatInterface = (props: {
	theme: number | null;
	connectionId: Types.ObjectId | null;
	messages: string[];
	setMessages: Dispatch<SetStateAction<string[]>>;
	setIsCreating: Dispatch<SetStateAction<boolean>>;
}) => {
	const { theme, connectionId, messages, setMessages, setIsCreating } = props;
	const { me } = useContext(AuthContext);
	const [onRecord, setOnRecord] = useState<boolean>(true);
	const [base64, setBase64] = useState<string | undefined>(undefined);
	const [audioSrc, setAudioSrc] = useState<string | undefined>(undefined);
	const divRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const div = divRef.current;
		if (div) {
			div.scrollTop = div.scrollHeight;
		}

		if (base64) {
			const audio_data = base64;
			setBase64(undefined);
			postFetcher<{ text: string }>('/mystic/stt', {
				connectionId,
				audio_data,
			})
				.then((response: { text: string }) => {
					setMessages(prev => [...prev, response.text]);

					postFetcher<{ content: string }>('/mystic/chat/invoke', {
						connectionId,
						content: response.text,
					})
						.then((response: { content: string }) => {
							if (response.content.includes('종료')) {
								setIsCreating(true);
							} else {
								postFetcher<{ audio_data: string }>('/mystic/tts', {
									text: response.content,
									speaker: themes[theme].src.split('/')[2].split('.')[0],
								})
									.then((response: { audio_data: string }) => {
										const byteString = atob(response.audio_data);
										const byteNumbers = new Array(byteString.length);
										for (let i = 0; i < byteString.length; i++) {
											byteNumbers[i] = byteString.charCodeAt(i);
										}
										const byteArray = new Uint8Array(byteNumbers);
										const blob = new Blob([byteArray], { type: 'audio/wav' });
										const url = URL.createObjectURL(blob);
										setAudioSrc(url);
									})
									.catch((error: Error) => {
										throw error;
									});
								setMessages(prev => [...prev, response.content]);
							}
						})
						.catch((error: Error) => {
							setMessages(prev => [...prev, '죄송합니다. 다시 말씀해 주세요.']);
							throw error;
						});
				})
				.catch((error: Error) => {
					setOnRecord(true);
					console.error(error);
				});
		}
	}, [connectionId, messages, setMessages, base64, theme]);

	return (
		<div className={style.container}>
			<div ref={divRef}>
				{me &&
					messages.map((message, index) =>
						index % 2 === 0 ? (
							<Chat
								key={index}
								nickname={themes[theme].name}
								profileImageId={themes[theme].src}
								content={message}
								align="right"
							/>
						) : (
							<Chat
								key={index}
								nickname={me.nickname}
								profileImageId={
									me.profileImageId
										? me.profileImageId.toString().startsWith('/')
											? me.profileImageId.toString()
											: `${
													process.env.NEXT_PUBLIC_S3_BUCKET_URL
											  }/w512/profile/${me.profileImageId.toString()}`
										: undefined
								}
								content={message}
							/>
						),
					)}
			</div>
			<AudioRecorder
				width={'40cqw'}
				height={'40cqw'}
				onRecord={onRecord}
				setOnRecord={setOnRecord}
				setBase64={setBase64}
			/>
			<audio
				autoPlay
				src={audioSrc}
				style={{ display: 'none' }}
				onEnded={() => {
					setOnRecord(true);
					setAudioSrc(undefined);
				}}
			/>
		</div>
	);
};

export default DiaryPageChatInterface;
