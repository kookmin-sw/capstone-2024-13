'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ProfileImage from '@/component/profile-image';
import RegisterButton from '@/container/(public)/auth/register/button';
import RegisterNickname from '@/container/(public)/auth/register/nickname';
import style from '@/style/app/(public)/auth/register/index.module.css';

const RegisterPage = () => {
	const searchParams = useSearchParams();
	const [src, setSrc] = useState<string | undefined>(undefined);
	const [file, setFile] = useState<File | null>(null);
	const [nickname, setNickname] = useState<string>(searchParams.get('nickname') || '');

	return (
		<div className={style.container}>
			<div>
				<div>
					<span>프로필 이미지</span>
					<ProfileImage width="90cqw" height="90cqw" src={src} setSrc={setSrc} setFile={setFile} />
				</div>
				<RegisterNickname value={nickname} onChange={event => setNickname(event.target.value)} />
				<RegisterButton nickname={nickname} file={file} />
			</div>
		</div>
	);
};

export default RegisterPage;
