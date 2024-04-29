import ProfileImage from '../profile-image';
import style from '@/style/component/chat/index.module.css';

const Chat = (props: {
	nickname: string;
	content: string;
	profileImageId?: string;
	align?: 'left' | 'right';
}) => {
	const { nickname, content, profileImageId, align = 'left' } = props;

	return (
		<div className={align == 'left' ? style.left : style.right}>
			{align == 'left' ? (
				<>
					<ProfileImage src={profileImageId} width="15cqw" height="15cqw" />
					<div>
						<span>{nickname}</span>
						<span>{content}</span>
					</div>
				</>
			) : (
				<>
					<div>
						<span>{nickname}</span>
						<span>{content}</span>
					</div>
					<ProfileImage src={profileImageId} width="15cqw" height="15cqw" />
				</>
			)}
		</div>
	);
};

export default Chat;
