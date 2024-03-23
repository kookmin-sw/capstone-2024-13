import style from '../../_style/component/chat/index.module.css';
import ProfileImage from '../profile-image';

const Chat = (props: {
	nickname: string;
	content: string;
	profileImageId?: string;
	position?: 'left' | 'right';
}) => {
	const { nickname, content, profileImageId, position = 'left' } = props;

	return (
		<div className={position == 'left' ? style.left : style.right}>
			{position == 'left' ? (
				<>
					<div>
						<ProfileImage src={profileImageId} />
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
						<ProfileImage src={profileImageId} />
					</div>
				</>
			)}
		</div>
	);
};

export default Chat;
