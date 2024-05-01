'use client';

import { useContext, useEffect, useState } from 'react';
import Header from '@/component/header';
import MyPageButtonGroup from '@/container/(private)/mypage/button-group';
import MyPageEditButton from '@/container/(private)/mypage/edit-button';
import MyPageLogoutButton from '@/container/(private)/mypage/logout-button';
import style from '@/style/app/(private)/mypage/index.module.css';
import AuthContext from '@/context/auth';
import ProfileImage from '@/component/profile-image';
import MyPageEditNickname from '@/container/(private)/mypage/edit-nickname';

const MyPage = () => {
	const { me } = useContext(AuthContext);
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [src, setSrc] = useState<string | undefined>(undefined);
	const [file, setFile] = useState<File | null>(null);
	const [nickname, setNickname] = useState<string | undefined>(undefined);

	useEffect(() => {
		if (me) {
			setSrc(
				me.profileImageId
					? me.profileImageId.toString().startsWith('/')
						? me.profileImageId.toString()
						: `${
								process.env.NEXT_PUBLIC_S3_BUCKET_URL
						  }/w512/profile/${me.profileImageId.toString()}`
					: undefined,
			);
			setNickname(me.nickname);
		}
	}, [me]);

	return (
		<div className={style.container}>
			<Header
				title="마이페이지"
				component={
					!isEditing && <MyPageEditButton isEditing={isEditing} setIsEditing={setIsEditing} />
				}
			/>
			{isEditing ? (
				<>
					<div className={style.body}>
						<ProfileImage
							width={'60cqw'}
							height={'60cqw'}
							src={src}
							setSrc={setSrc}
							setFile={setFile}
						/>
						<MyPageEditNickname nickname={nickname} setNickname={setNickname} />
					</div>
					{isEditing && (
						<MyPageEditButton
							isEditing={isEditing}
							setIsEditing={setIsEditing}
							file={file}
							setFile={setFile}
							originSrc={
								me?.profileImageId
									? me?.profileImageId.toString().startsWith('/')
										? me?.profileImageId.toString()
										: `${
												process.env.NEXT_PUBLIC_S3_BUCKET_URL
										  }/w512/profile/${me?.profileImageId.toString()}`
									: undefined
							}
							setSrc={setSrc}
							originNickname={me?.nickname}
							nickname={nickname}
							setNickname={setNickname}
						/>
					)}
				</>
			) : (
				<div className={style.body}>
					<ProfileImage width={'60cqw'} height={'60cqw'} src={src} />
					<span className={style.nickname}>{me?.nickname}</span>
					<span className={style.email}>{me?.email}</span>
					<MyPageButtonGroup />
					<MyPageLogoutButton />
				</div>
			)}
		</div>
	);
};

export default MyPage;
