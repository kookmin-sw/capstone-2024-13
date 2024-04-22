import { useContext } from 'react';
import AuthContext from '@/app/_context/auth';
import ProfileImage from '@/app/_component/profile-image';
import style from '../../../../_style/(route)/(private)/mypage/profile/index.module.css';

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
					width={'50cqw'}
					height={'50cqw'}
				/>
				<span className={style.nickname}>{me.nickname}</span>
				<span className={style.email}>{me.email}</span>
			</div>
		)
	);
};

export default MyPageProfile;
