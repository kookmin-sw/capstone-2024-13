import { Dispatch, SetStateAction } from 'react';
import Theme from './theme';
import style from '@/style/container/(private)/diary/theme-select/index.module.css';

type ThemeType = {
	id: number;
	name: string;
	description: string;
	src?: string;
	audio?: string;
};

const themes: ThemeType[] = [
	{
		id: 0,
		name: '박하명',
		description: '친근한 교수님',
		src: '/image/Park.png',
		audio: '/audio/Park-click.wav',
	},
	{
		id: 1,
		name: '이상환',
		description: '다정한 학장님',
		src: '/image/Lee.png',
		audio: '/audio/Lee-click.wav',
	},
	{
		id: 2,
		name: '이영지',
		description: 'MZ 대통령',
		src: '/image/Young.png',
		audio: '/audio/Young-click.wav',
	},
	{
		id: 3,
		name: '짱구',
		description: '장난꾸러기',
		src: '/image/Shin.png',
		audio: '/audio/Shin-click.wav',
	},
];

const DiaryPageThemeSelect = (props: {
	theme: number | null;
	setTheme: Dispatch<SetStateAction<number | null>>;
}) => {
	const { theme: curTheme, setTheme } = props;

	return (
		<div className={style.container}>
			{themes.map((theme: ThemeType, index: number) => {
				return <Theme key={index} curTheme={curTheme} setTheme={setTheme} {...theme} />;
			})}
		</div>
	);
};

export default DiaryPageThemeSelect;
