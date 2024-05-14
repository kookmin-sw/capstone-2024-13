import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react';
import { InsertPhoto } from '@mui/icons-material';
import style from '@/style/container/(private)/diary/image-select/index.module.css';
import Image from 'next/image';

const FileDropper = (props: {
	images: string[];
	setImages: Dispatch<SetStateAction<string[]>>;
	setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
	const { images, setImages, setFiles } = props;
	const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files);

		if (4 < files.length) {
			alert('이미지는 최대 4장까지 선택할 수 있습니다.');
		}
		if (!files.length || 4 < files.length) {
			setImages([]);
			setFiles([]);
			return;
		}

		setFiles(files);
		setImages(
			await Promise.all(
				files.map((file: File, index: number) => {
					return new Promise(
						(
							resolve: (value: string | PromiseLike<string>) => void,
							reject: (reason?: any) => void,
						) => {
							try {
								const fileReader = new FileReader();
								fileReader.readAsDataURL(file);
								fileReader.onload = () => resolve(fileReader.result as string);
							} catch (error) {
								reject(error);
							}
						},
					);
				}),
			),
		);
	};

	return (
		<label
			className={style['file-dropper']}
			htmlFor="file-dropper"
			onClick={(event: MouseEvent<HTMLLabelElement>) => {
				event.stopPropagation();
			}}
		>
			<input
				type="file"
				accept="image/*"
				id="file-dropper"
				multiple
				onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event)}
			/>
			{images.length ? (
				<div className={style['file-dropper__images']}>
					{images.map((image: string, index: number) => {
						return (
							<div key={index} className={style['file-dropper__image']}>
								<Image src={image} alt="image" fill sizes="100%" priority />
							</div>
						);
					})}
				</div>
			) : (
				<InsertPhoto />
			)}
		</label>
	);
};

const DiaryPageImageSelect = (props: {
	images: string[];
	setImages: Dispatch<SetStateAction<string[]>>;
	setFiles: Dispatch<SetStateAction<File[]>>;
}) => {
	const { images, setImages, setFiles } = props;

	return (
		<div className={style.container}>
			<FileDropper images={images} setImages={setImages} setFiles={setFiles} />
		</div>
	);
};

export default DiaryPageImageSelect;
