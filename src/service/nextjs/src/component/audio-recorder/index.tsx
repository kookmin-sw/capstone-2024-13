'use client';

import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
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
	const startBeep = useMemo(() => new Audio('/public/audio/start-beep.wav'), []);
	const endBeep = useMemo(() => new Audio('/public/audio/end-beep.wav'), []);

	const startRecording = useCallback(() => {
		setVoiceDetected(true);
		media.start();
		media.ondataavailable = (event: BlobEvent) => {
			const blob = new Blob([event.data], { type: 'audio/webm' });
			const fileReader = new FileReader();
			fileReader.readAsDataURL(blob);
			fileReader.onload = () => setBase64((fileReader.result as string).split(',')[1]);
		};
	}, [media, setBase64]);

	const stopRecording = useCallback(() => {
		endBeep.play();
		setOnRecord(false);
		setVoiceDetected(false);
		mediaStreamSource.disconnect();
		analyser.disconnect();
		stream.getTracks().forEach(track => track.stop());
		media.stop();
		setStream(null);
		setMedia(null);
		setAnalyser(null);
		setMediaStreamSource(null);
	}, [stream, media, analyser, mediaStreamSource, setOnRecord, endBeep]);

	const detectVoice = useCallback(() => {
		if (stream && media && analyser && mediaStreamSource && onRecord) {
			startBeep.play();
			const data = new Float32Array(analyser.frequencyBinCount);
			analyser.getFloatFrequencyData(data);
			if (!voiceDetected && data.some(value => -65 < value)) {
				startRecording();
			} else if (voiceDetected && !data.some(value => -65 < value)) {
				stopRecording();
			}
		}
	}, [
		stream,
		media,
		analyser,
		mediaStreamSource,
		voiceDetected,
		startRecording,
		stopRecording,
		onRecord,
		startBeep,
	]);

	useEffect(() => {
		const detectInterval = setInterval(detectVoice, 500);

		if (!navigator.mediaDevices) {
			router.refresh();
			return;
		}

		if (onRecord && !stream && !media && !analyser && !mediaStreamSource) {
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
		}

		return () => {
			clearInterval(detectInterval);
		};
	}, [onRecord, stream, media, analyser, mediaStreamSource, detectVoice, router]);

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
