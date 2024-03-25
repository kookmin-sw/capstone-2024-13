'use client';

import style from '../../_style/(route)/chat/index.module.css';
import Chat from '@/app/_component/chat';
import AuthContext from '@/app/_context/auth';
import postConnectMystic from '@/app/_service/postConnectMystic';
import { Types } from 'mongoose';
import { useContext, useEffect, useState } from 'react';

const ChatPage = () => {
	const { me } = useContext(AuthContext);
	const [connectionId, setConnectionId] = useState<Types.ObjectId | null>(null);
	const [messages, setMessages] = useState<string[]>([]);

	useEffect(() => {
		if (me) {
			if (!connectionId) {
				postConnectMystic({ version: 'v3' }).then(response => {
					setConnectionId(response);
					setMessages(['안녕하세요. 저는 당신의 하루에 귀기울이는 Mystic입니다.', '안녕, 반가워']);
				});
			}
		}
	}, [me, connectionId]);

	return (
		<div className={style.container}>
			<div>
				{messages.map((message, index) => (
					<Chat
						key={index}
						nickname={index % 2 ? me?.nickname || '' : 'LLM'}
						content={message}
						position={index % 2 ? 'left' : 'right'}
					/>
				))}
			</div>
		</div>
	);
};

export default ChatPage;
