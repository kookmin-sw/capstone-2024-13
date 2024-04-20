'use client';

import Image from 'next/image';
import style from '../../../_style/component/diary/swiper/index.module.css';
import { useEffect, useRef, useState } from 'react';

const DiarySwiper = (props: { images?: string[] }) => {
	const { images } = props;
	const [isSwiping, setIsSwiping] = useState<boolean>(false);
	const [indicatorTimeout, setIndicatorTimeout] = useState<NodeJS.Timeout | undefined>(undefined);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const divRefs = useRef<(HTMLDivElement | null)[]>([]);

	const handleInteraction = () => {
		setIsSwiping(true);
		if (indicatorTimeout) {
			clearTimeout(indicatorTimeout);
		}
		setIndicatorTimeout(
			setTimeout(() => {
				setIsSwiping(false);
			}, 1000),
		);
	};

	useEffect(() => {
		const divs = divRefs.current;

		if (divs) {
			const observer = new IntersectionObserver(
				entries => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							const index = divs.indexOf(entry.target as HTMLDivElement);
							setCurrentIndex(index);
						}
					});
				},
				{ threshold: 0.5 },
			);

			divs.forEach(divRef => {
				if (divRef) {
					observer.observe(divRef);
				}
			});

			return () => {
				divs.forEach(divRef => {
					if (divRef) {
						observer.unobserve(divRef);
					}
				});
			};
		}
	}, [divRefs]);

	return (
		<div className={style.container}>
			{isSwiping && (
				<span className={style.indicator}>{`${currentIndex + 1}/${images?.length}`}</span>
			)}
			<div
				className={style.swiper}
				onTouchMove={() => handleInteraction()}
				onScroll={() => handleInteraction()}
			>
				{images &&
					0 < images.length &&
					images.map((image, index) => (
						<div
							key={index}
							ref={divRef => (divRefs.current[index] = divRef)}
							className={style.image}
						>
							<Image src={image} alt="image" fill sizes="100%" priority />
						</div>
					))}
			</div>
		</div>
	);
};

export default DiarySwiper;
