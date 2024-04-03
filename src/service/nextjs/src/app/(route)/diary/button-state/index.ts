import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { Dispatch, SetStateAction } from 'react';

const ButtonState = [
	{
		text: '다음으로',
		onClick: (
			step: number,
			setStep: Dispatch<SetStateAction<number>>,
			setIsCreating?: Dispatch<SetStateAction<boolean>>,
			router?: AppRouterInstance,
		) => {
			setStep(step + 1);
		},
	},
	{
		text: '다음으로',
		onClick: (
			step: number,
			setStep: Dispatch<SetStateAction<number>>,
			setIsCreating?: Dispatch<SetStateAction<boolean>>,
			router?: AppRouterInstance,
		) => {
			setStep(step + 1);
		},
	},
	{
		text: '다음으로',
		onClick: (
			step: number,
			setStep: Dispatch<SetStateAction<number>>,
			setIsCreating?: Dispatch<SetStateAction<boolean>>,
			router?: AppRouterInstance,
		) => {
			setIsCreating && setIsCreating(true);
			setTimeout(() => {
				setIsCreating && setIsCreating(false);
				setStep(step + 1);
			}, 3000);
		},
	},
	{
		text: '업로드',
		onClick: (
			step: number,
			setStep: Dispatch<SetStateAction<number>>,
			setIsCreating?: Dispatch<SetStateAction<boolean>>,
			router?: AppRouterInstance,
		) => {
			router?.push('/');
		},
	},
];

export default ButtonState;
