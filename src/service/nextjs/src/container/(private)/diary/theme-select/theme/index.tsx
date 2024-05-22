import { Dispatch, MouseEvent, SetStateAction } from 'react';
import Image from 'next/image';
import style from '@/style/container/(private)/diary/theme-select/theme/index.module.css';

const Theme = (props: {
	curTheme: number | null;
	id: number;
	name: string;
	description: string;
	setTheme: Dispatch<SetStateAction<number | null>>;
	src?: string;
	audio?: string;
	onClick?: () => void;
}) => {
	const {
		curTheme,
		id,
		name,
		description,
		setTheme,
		src = '/image/default-image-00.png',
		audio,
	} = props;

	return (
		<div
			className={style.container + (curTheme === id ? ' ' + style['selected-container'] : '')}
			onClick={(event: MouseEvent<HTMLDivElement>) => {
				event.preventDefault();
				event.stopPropagation();
				setTheme(id);
				if (audio) {
					const audioElement = new Audio(audio);
					audioElement.play();
				}
			}}
		>
			<span className={style.description}>{description}</span>
			<span className={style.name}>{name}</span>
			<div className={style.image + (curTheme === id ? ' ' + style['selected-image'] : '')}>
				<Image src={src} alt={name} fill sizes="100%" priority />
			</div>
		</div>
	);
};

export default Theme;
