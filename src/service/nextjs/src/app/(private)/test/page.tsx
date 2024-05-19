'use client';

import { useState } from 'react';
import AudioRecorder from '@/component/audio-recorder';
import Header from '@/component/header';
import style from '@/style/app/(private)/test/index.module.css';

const TestPage = () => {
	const [onRecord, setOnRecord] = useState<boolean>(true);
	const [base64, setBase64] = useState<string | undefined>(undefined);

	return (
		<div className={style.container}>
			<Header title="Test" />
			<AudioRecorder
				onRecord={onRecord}
				setOnRecord={setOnRecord}
				base64={base64}
				setBase64={setBase64}
			/>
		</div>
	);
};

export default TestPage;
