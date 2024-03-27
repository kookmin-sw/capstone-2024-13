import { useContext } from 'react';
import AuthContext from '@/app/_context/auth';
import ProfileImage from '@/app/_component/profile-image';
import style from '../../../_style/(route)/mypage/profile/index.module.css';

const MyPageProfile = () => {
	const { me } = useContext(AuthContext);

	return (
		me && (
			<div className={style.container}>
				<ProfileImage src={me.profileImageId?.toString()} width={'60cqw'} height={'60cqh'} />
				<span>{me.nickname}</span>
				<span>{me.email}</span>
			</div>
		)
	);
};

export default MyPageProfile;
