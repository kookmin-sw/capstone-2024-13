import style from '../../_style/component/chat/index.module.css';
import ProfileImage from '../profile-image';

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
