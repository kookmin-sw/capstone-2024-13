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
		description: '게임 매니아 교수',
		src: '/image/Park.png',
	},
	{ id: 1, name: '이상환', description: '자상한 교수', src: '/image/Lee.png' },
	{ id: 2, name: '이영지', description: 'MZ 대통령', src: '/image/Young.png' },
	{ id: 3, name: '짱구', description: '장난꾸러기', src: '/image/Shin.png' },
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
