'use client';

import { Diary } from '../../_type/index';
import {
	Dispatch,
	ReactNode,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react';
import AuthContext from '../auth';
import { getFetcher } from '@/app/_service/api';

const DiaryContext = createContext<{
	diary: Diary[] | null;
	setDiary: Dispatch<SetStateAction<Diary[] | null>>;
}>({
	diary: null,
	setDiary: () => {},
});

export const DiaryProvider = (props: { children: ReactNode }) => {
	const { children } = props;
	const [diary, setDiary] = useState<Diary[] | null>(null);
	const { me } = useContext(AuthContext);

	useEffect(() => {
		if (me) {
			getFetcher('/diary')
				.then((response: any) => {
					setDiary(response);
				})
				.catch(error => {
					setDiary(null);
				});
		}
	}, [me]);

	return <DiaryContext.Provider value={{ diary, setDiary }}>{children}</DiaryContext.Provider>;
};

export default DiaryContext;
