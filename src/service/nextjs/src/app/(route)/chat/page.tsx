'use client';

import style from '../../_style/(route)/chat/index.module.css';
import Chat from '@/app/_component/chat';
import AuthContext from '@/app/_context/auth';
import { useContext, useState } from 'react';

const ChatPage = () => {
	const { me } = useContext(AuthContext);
	const [messages, setMessages] = useState<string[]>([
		'Hello world Hello world Hello world Hello world Hello world',
	]);

	if (!me) {
		return null;
	}

	return (
		<div className={style.container}>
			<div>
				{messages.map((message, index) => (
					<Chat key={index} nickname={me.nickname} content={message} />
				))}
				<Chat nickname={'LLM'} content="Hello world" position="right" />
			</div>
		</div>
	);
};

export default ChatPage;
