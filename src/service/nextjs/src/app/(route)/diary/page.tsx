'use client';

import Header from '@/app/_component/header';
import style from '../../_style/(route)/diary/index.module.css';
import DiaryPageStepIndicator from './step-indicator';
import { Button } from '@mui/material';
import { useState } from 'react';
import ButtonState from './button-state';
import DiaryPageThemeSelect from './theme-select';
import DiaryPageImageSelect from './image-select';
import DiaryPageChatInterface from './chat-interface/page';
import DiaryPageCreating from './creating';
import DiaryPageFinalDraft from './final-draft';
import { useRouter } from 'next/navigation';

const StepIndicatorState = [
	{ title: '챗봇 테마 선택', description: '챗봇의 스타일을 선택해주세요.' },
	{ title: '사진 첨부', description: '일기에 첨부할 사진을 선택해주세요.' },
	{ title: '일기 작성', description: '챗봇과 함께 일기를 작성해주세요.' },
	{ title: '최종 수정', description: '작성한 일기를 확인해주세요.' },
];

const BodyState = [
	<DiaryPageThemeSelect key={1} />,
	<DiaryPageImageSelect key={2} />,
	<DiaryPageChatInterface key={3} />,
	<DiaryPageFinalDraft key={4} />,
];

const DiaryPage = () => {
	const router = useRouter();
	const [step, setStep] = useState<number>(1);
	const [isCreating, setIsCreating] = useState<boolean>(false);

	return (
		<div className={style.container}>
			<Header title="일기 작성" />
			{!isCreating && (
				<DiaryPageStepIndicator current={step} total={4} {...StepIndicatorState[step - 1]} />
			)}
			{isCreating ? <DiaryPageCreating /> : BodyState[step - 1]}
			{!isCreating && (
				<Button
					onClick={() => {
						if (step <= 2) {
							ButtonState[step - 1].onClick(step, setStep);
						} else if (step === 3) {
							ButtonState[step - 1].onClick(step, setStep, setIsCreating);
						} else {
							ButtonState[step - 1].onClick(step, setStep, undefined, router);
						}
					}}
				>
					{ButtonState[step - 1].text}
				</Button>
			)}
		</div>
	);
};

export default DiaryPage;
