import { Dispatch, SetStateAction } from 'react';
import style from '../../../_style/(route)/diary/theme-select/index.module.css';

const DiaryPageThemeSelect = (props: {
	theme: string;
	setTheme: Dispatch<SetStateAction<string>>;
}) => {
	const { theme, setTheme } = props;

	return <div className={style.container}></div>;
};

export default DiaryPageThemeSelect;
