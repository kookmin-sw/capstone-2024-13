'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import style from '@/style/component/audio-recorder/index.module.css';
import { Mic, SettingsVoice } from '@mui/icons-material';

const AudioRecorder = (props: {
	width?: number | string;
	height?: number | string;
	onRecord?: boolean;
	setOnRecord?: Dispatch<SetStateAction<boolean>>;
	base64?: string | undefined;
	setBase64?: Dispatch<SetStateAction<string | undefined>>;
}) => {
	const { width = '100cqw', height = '100cqw', onRecord, setOnRecord, base64, setBase64 } = props;
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [media, setMedia] = useState<MediaRecorder | null>(null);
	const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
	const [mediaStreamSource, setMediaStreamSource] = useState<MediaStreamAudioSourceNode | null>(
		null,
	);
	const [voiceDetected, setVoiceDetected] = useState<boolean>(false);
	const router = useRouter();

	const detectVoice = useCallback(() => {
		if (analyser) {
			const data = new Float32Array(analyser.frequencyBinCount);
			analyser.getFloatFrequencyData(data);
			if (!voiceDetected && data.some(value => -65 < value)) {
				setVoiceDetected(true);
			} else if (voiceDetected && !data.some(value => -65 < value)) {
				setOnRecord(false);
				setVoiceDetected(false);
			}
		}
	}, [setOnRecord, analyser, voiceDetected]);

	useEffect(() => {
		const detectInterval = setInterval(detectVoice, 500);

		if (onRecord) {
			if (!stream && !media && !analyser && !mediaStreamSource) {
				if (!navigator.mediaDevices) {
					router.refresh();
					return;
				}
				navigator.mediaDevices
					.getUserMedia({ audio: true })
					.then((stream: MediaStream) => {
						setStream(stream);
						setMedia(new MediaRecorder(stream));
						const audioContext = new AudioContext();
						const analyser = audioContext.createAnalyser();
						setAnalyser(analyser);
						const mediaStreamSource = audioContext.createMediaStreamSource(stream);
						setMediaStreamSource(mediaStreamSource);
						mediaStreamSource.connect(analyser);
					})
					.catch(error => {
						console.error(error);
					});
			} else if (stream && media && analyser && mediaStreamSource) {
				if (voiceDetected) {
					media.start();
					media.ondataavailable = event => {
						const blob = new Blob([event.data], { type: 'audio/wav' });
						const fileReader = new FileReader();
						fileReader.readAsDataURL(blob);
						fileReader.onload = () => setBase64(fileReader.result as string);
					};
				}
			}
		} else {
			if (media) {
				media.stop();
			}
			if (stream) {
				stream.getTracks().forEach(track => track.stop());
			}
		}

		return () => {
			clearInterval(detectInterval);
		};
	}, [
		setBase64,
		setOnRecord,
		router,
		detectVoice,
		onRecord,
		stream,
		media,
		analyser,
		voiceDetected,
		mediaStreamSource,
	]);

	return (
		<div
			style={{ width, height }}
			className={style.container + ' ' + (voiceDetected ? style.activate : style.deactivate)}
		>
			<div className={style.circle}>
				<div className={style.circle}>
					<div>{voiceDetected ? <SettingsVoice /> : <Mic />}</div>
				</div>
			</div>
		</div>
	);
};

export default AudioRecorder;
