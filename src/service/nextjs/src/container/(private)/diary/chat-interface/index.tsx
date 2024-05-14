'use client';

import { Dispatch, SetStateAction, useContext, useState } from 'react';
import AuthContext from '@/context/auth';
import Chat from '@/component/chat';
import style from '@/style/container/(private)/diary/chat-interface/index.module.css';

type ThemeType = {
	id: number;
	title: string;
	name: string;
	description: string;
	src?: string;
	audio?: string;
};

const themes: ThemeType[] = [
	{
		id: 0,
		title: 'hmpark',
		name: '박하명',
		description: '게임 매니아 교수',
		src: '/image/Park.png',
	},
	{ id: 1, title: 'sanghwan', name: '이상환', description: '자상한 교수', src: '/image/Lee.png' },
	{ id: 2, title: 'shin-chan', name: '짱구', description: '장난꾸러기', src: '/image/Shin.png' },
	{ id: 3, title: 'repoter', name: '인턴기자', description: 'MZ대표' },
];

const DiaryPageChatInterface = (props: {
	theme: number | null;
	messages: string[];
	setMessages: Dispatch<SetStateAction<string[]>>;
}) => {
	const { me } = useContext(AuthContext);
	const { theme, messages, setMessages } = props;

	return (
		<div className={style.container}>
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
	);
};

export default DiaryPageChatInterface;
