import { ReactNode } from 'react';
import style from '@/style/component/diary/header/index.module.css';
import Image from 'next/image';
import ProfileImage from '@/component/profile-image';

const ParseDate = (date: Date) => {
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];

	return `${year}. ${month < 10 ? '0' + month : month}. ${
		day < 10 ? '0' + day : day
	}. ${dayOfWeek}`;
};

const DiaryComponentHeader = (props: {
	profileImageSrc?: string;
	author?: string;
	createdAt?: Date;
	component?: ReactNode;
}) => {
	const { profileImageSrc, author, createdAt, component } = props;

	return (
		<div className={style.container}>
			<div>
				<div>
					{profileImageSrc && (
						<div className={style['profile-image']}>
							<ProfileImage src={profileImageSrc} width={'100cqw'} height={'100cqw'} />
						</div>
					)}
					<div>
						{author && <span className={style.author}>{author}</span>}
						<span className={style.date}>{createdAt && ParseDate(new Date(createdAt))}</span>
					</div>
				</div>
				{component}
			</div>
		</div>
	);
};

export default DiaryComponentHeader;
