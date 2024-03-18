import style from '../../_style/component/chat/index.module.css';
import ProfileImage from '../profile-image';

const Chat = (props: {
	nickname: string;
	content: string;
	profileImageUrl?: string;
	position?: 'left' | 'right';
}) => {
	const { nickname, content, profileImageUrl, position = 'left' } = props;

	return (
		<div className={position == 'left' ? style.left : style.right}>
			{position == 'left' ? (
				<>
					<div>
						<ProfileImage src={profileImageUrl} />
					</div>
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
					<div>
						<ProfileImage src={profileImageUrl} />
					</div>
				</>
			)}
		</div>
	);
};

export default Chat;
