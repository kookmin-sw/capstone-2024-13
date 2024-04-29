import { useContext } from 'react';
import ProfileImage from '@/component/profile-image';
import AuthContext from '@/context/auth';
import style from '@/style/container/(private)/mypage/profile/index.module.css';

const MyPageProfile = () => {
	const { me } = useContext(AuthContext);

	return (
		me && (
			<div className={style.container}>
				<ProfileImage
					src={
						me.profileImageId
							? me.profileImageId.toString().startsWith('/')
								? me.profileImageId.toString()
								: `${
										process.env.NEXT_PUBLIC_S3_BUCKET_URL
								  }/w512/profile/${me.profileImageId.toString()}`
							: undefined
					}
					width={'60cqw'}
					height={'60cqw'}
				/>
				<span className={style.nickname}>{me.nickname}</span>
				<span className={style.email}>{me.email}</span>
			</div>
		)
	);
};

export default MyPageProfile;
