import { Dispatch, SetStateAction } from 'react';
import style from '../../../../_style/(route)/(private)/diary/theme-select/index.module.css';
import ThemeComponent from './theme';

type Theme = {
	title: string;
	name: string;
	description: string;
	src?: string;
	audio?: string;
};

const Themes: Theme[] = [
	{ title: 'hmpark', name: '박하명', description: '게임 매니아 교수' },
	{ title: 'sanghwan', name: '이상환', description: '자상한 교수' },
	{ title: 'shin-chan', name: '짱구', description: '장난꾸러기' },
	{ title: 'repoter', name: '인턴기자', description: 'MZ대표' },
];

const DiaryPageThemeSelect = (props: {
	theme: string;
	setTheme: Dispatch<SetStateAction<string>>;
}) => {
	const { theme: curTheme, setTheme } = props;

	return (
		<div className={style.container}>
			{Themes.map((theme: Theme, index: number) => {
				return <ThemeComponent key={index} curTheme={curTheme} setTheme={setTheme} {...theme} />;
			})}
		</div>
	);
};

export default DiaryPageThemeSelect;
