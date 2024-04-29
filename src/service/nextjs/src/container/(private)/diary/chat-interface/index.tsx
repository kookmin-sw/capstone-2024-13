'use client';

import { useContext, useState } from 'react';
import AuthContext from '@/context/auth';
import Chat from '@/component/chat';
import style from '@/style/container/(private)/diary/chat-interface/index.module.css';

const DiaryPageChatInterface = () => {
	const { me } = useContext(AuthContext);
	const [messages, setMessages] = useState<string[]>([
		'안녕하세요. 저는 당신의 하루에 귀기울이는 Mystic입니다.',
		'안녕, 반가워',
	]);

	return (
		<div className={style.container}>
			{me &&
				messages.map((message, index) =>
					index % 2 === 0 ? (
						<Chat
							key={index}
							nickname={'Mystic'}
							profileImageId={'/image/default-profile-image.png'}
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
