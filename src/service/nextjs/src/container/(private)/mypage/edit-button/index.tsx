import Button from '@/component/button';
import AuthContext from '@/context/auth';
import { patchFetcher } from '@/service/api';
import { patchProfileImage } from '@/service';
import style from '@/style/container/(private)/mypage/edit-button/index.module.css';
import { Me } from '@/type';
import { Dispatch, SetStateAction, useContext } from 'react';

const handleClick = async (
	file: File | null,
	setFile: Dispatch<SetStateAction<File | null>>,
	originNickname: string | undefined,
	nickname: string | undefined,
	setNickname: Dispatch<SetStateAction<string | undefined>>,
	setMe: Dispatch<SetStateAction<Me | null>>,
	setIsEditing: Dispatch<SetStateAction<boolean>>,
) => {
	if (file) {
		await patchProfileImage(file)
			.then((response: Me) => {
				setMe(response);
			})
			.catch((error: Error) => {
				setFile(null);
				setNickname(originNickname);
				setIsEditing(false);
				console.error(error);
				alert('내 정보 수정에 실패했습니다. 다시 시도해주세요.');
				return;
			});
	}

	await patchFetcher<Me>('/user/me', {
		update: { nickname },
		options: { new: true },
	})
		.then((response: Me) => {
			setMe(response);
			setIsEditing(false);
			alert('수정되었습니다.');
		})
		.catch((error: Error) => {
			console.error(error);
			alert('내 정보 수정에 실패했습니다. 다시 시도해주세요.');
		});
};

const MyPageEditButton = (props: {
	isEditing: boolean;
	setIsEditing: Dispatch<SetStateAction<boolean>>;
	originSrc?: string;
	setSrc?: Dispatch<SetStateAction<string | undefined>>;
	file?: File | null;
	setFile?: Dispatch<SetStateAction<File | null>>;
	originNickname?: string;
	nickname?: string;
	setNickname?: Dispatch<SetStateAction<string | undefined>>;
}) => {
	const {
		isEditing,
		setIsEditing,
		originSrc,
		setSrc,
		file = null,
		setFile,
		originNickname,
		nickname,
		setNickname,
	} = props;
	const { setMe } = useContext(AuthContext);

	return isEditing && setSrc && setFile && setNickname ? (
		<div className={style.isEditing}>
			<Button
				variant="outlined"
				color="primary"
				onClick={() => {
					setSrc(originSrc);
					setNickname(originNickname);
					setIsEditing(false);
				}}
			>
				취소
			</Button>
			<Button
				variant="outlined"
				color="primary"
				disabled={!nickname || nickname?.length < 2 || 20 < nickname?.length}
				onClick={() =>
					handleClick(file, setFile, originNickname, nickname, setNickname, setMe, setIsEditing)
				}
			>
				완료
			</Button>
		</div>
	) : (
		<Button
			variant="outlined"
			color="primary"
			onClick={() => setIsEditing(true)}
			className={style.isNotEditing}
		>
			수정
		</Button>
	);
};

export default MyPageEditButton;
