'use client';

import { useContext, useState } from 'react';
import style from '../../../_style/(route)/diary/[id]/index.module.css';
import Header from '@/app/_component/header';
import Chat from '@/app/_component/chat';
import AuthContext from '@/app/_context/auth';

const DiaryCreatePage = (props: { params: { id: string } }) => {
	const { id } = props.params;
	const { me } = useContext(AuthContext);
	const [messages, setMessages] = useState<string[]>([
		'안녕하세요. 저는 당신의 하루에 귀기울이는 Mystic입니다.',
		'안녕, 반가워',
	]);

	return (
		<div className={style.container}>
			<Header title="일기 작성" component={<div>{id}</div>} />
			{me && (
				<div>
					{messages.map((message, index) =>
						index % 2 === 0 ? (
							<Chat
								key={index}
								nickname={'Mystic'}
								profileImageId={'/default-profile-image.png'}
								content={message}
								align="right"
							/>
						) : (
							<Chat
								key={index}
								nickname={me.nickname}
								profileImageId={
									me.profileImageId
										? me.profileImageId.toString().startsWith('default')
											? `/${me.profileImageId.toString()}.png`
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
			)}
		</div>
	);
};

export default DiaryCreatePage;
