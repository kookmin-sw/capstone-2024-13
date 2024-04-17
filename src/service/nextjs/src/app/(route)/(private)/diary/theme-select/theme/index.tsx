import Image from 'next/image';
import { Dispatch, MouseEvent, SetStateAction } from 'react';
import style from '../../../../../_style/(route)/(private)/diary/theme-select/theme/index.module.css';

const ThemeComponent = (props: {
	curTheme: string;
	title: string;
	name: string;
	description: string;
	setTheme: Dispatch<SetStateAction<string>>;
	src?: string;
	audio?: string;
	onClick?: () => void;
}) => {
	const {
		curTheme,
		title,
		name,
		description,
		setTheme,
		src = '/default-image-00.png',
		audio,
	} = props;

	return (
		<div
			className={style.container + (curTheme === title ? ' ' + style['selected-container'] : '')}
			onClick={(event: MouseEvent<HTMLDivElement>) => {
				event.preventDefault();
				event.stopPropagation();
				setTheme(title);
			}}
		>
			<span className={style.description}>{description}</span>
			<span className={style.name}>{name}</span>
			<div className={style.image + (curTheme === title ? ' ' + style['selected-image'] : '')}>
				<Image src={src} alt={name} fill sizes="100%" priority />
			</div>
		</div>
	);
};

export default ThemeComponent;
