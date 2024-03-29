import { useContext } from 'react';
import AuthContext from '@/app/_context/auth';
import ProfileImage from '@/app/_component/profile-image';
import style from '../../../_style/(route)/mypage/profile/index.module.css';

const MyPageProfile = () => {
	const { me } = useContext(AuthContext);

	return (
		me && (
			<div className={style.container}>
				<ProfileImage
					src={
						me.profileImageId
							? me.profileImageId.toString().startsWith('default')
								? `/${me.profileImageId.toString()}.png`
								: `${
										process.env.NEXT_PUBLIC_S3_BUCKET_URL
								  }/w512/profile/${me.profileImageId.toString()}`
							: undefined
					}
					width={'60cqw'}
					height={'60cqh'}
				/>
				<span>{me.nickname}</span>
				<span>{me.email}</span>
			</div>
		)
	);
};

export default MyPageProfile;
