import { Album as AlbumType, Diary } from '@/type';
import { InsertPhoto } from '@mui/icons-material';
import { Dispatch, MouseEvent, SetStateAction, useContext } from 'react';
import AlbumContext from '@/context/album';
import style from '@/style/container/(private)/album/[albumId]/diary/[diaryId]/add-to-album/index.module.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { patchAddToAlbum } from '@/service';

const Header = () => {
	return (
		<div className={style.header}>
			<span className={style.title}>앨범에 추가하기</span>
		</div>
	);
};

const NewAlbum = () => {
	return (
		<div className={style['new-album']}>
			<div>
				<InsertPhoto />
			</div>
			<span>새 앨범</span>
		</div>
	);
};

const handleClick = async (
	diary: Diary,
	album: AlbumType,
	setAlbums: Dispatch<SetStateAction<AlbumType[]>>,
	router: AppRouterInstance,
) => {
	await patchAddToAlbum(diary, album)
		.then((newAlbum: any) => {
			if (newAlbum) {
				setAlbums((albums: AlbumType[]) => {
					return albums.map((album: AlbumType) => {
						if (album._id === newAlbum._id) {
							return newAlbum;
						}
						return album;
					});
				});
			}
		})
		.catch((error: Error) => {
			console.error(error);
			alert('앨범 추가에 실패했습니다.');
		});
	router.push(`/album/${album._id.toString()}`);
};

const Album = (props: {
	diary: Diary;
	album: AlbumType;
	setAlbums: Dispatch<SetStateAction<AlbumType[]>>;
	router: AppRouterInstance;
}) => {
	const { diary, album, setAlbums, router } = props;

	return (
		<div
			className={style.album}
			onClick={(event: MouseEvent<HTMLDivElement>) => {
				event.preventDefault();
				event.stopPropagation();
				handleClick(diary, album, setAlbums, router);
			}}
		>
			<div>
				{album.thumbnail && (
					<Image src={album.thumbnail} alt="album thumbnail image" fill sizes="100%" priority />
				)}
			</div>
			<div>
				<span>{album.title}</span>
				<span>{album.count}</span>
			</div>
		</div>
	);
};

const AddToAlbum = (props: { diary: Diary }) => {
	const { diary } = props;
	const { albums, setAlbums } = useContext(AlbumContext);
	const router = useRouter();

	return (
		<div className={style.container}>
			<Header />
			<div className={style.body}>
				<NewAlbum />
				<div className={style.albums}>
					<span>내 앨범</span>
					<div>
						{albums.map((album: AlbumType, index) => (
							<Album
								key={index}
								diary={diary}
								album={album}
								setAlbums={setAlbums}
								router={router}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddToAlbum;
