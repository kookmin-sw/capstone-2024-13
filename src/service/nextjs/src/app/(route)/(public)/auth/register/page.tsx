'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import ProfileImage from '../../../../_component/profile-image';
import style from '../../../../_style/(route)/(public)/auth/register/index.module.css';
import NicknameField from './nickname-field';
import RegisterButton from './button';

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
				<NicknameField value={nickname} onChange={event => setNickname(event.target.value)} />
				<RegisterButton nickname={nickname} file={file} />
			</div>
		</div>
	);
};

export default RegisterPage;
