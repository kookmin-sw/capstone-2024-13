import style from '../../../../_style/(route)/(private)/diary/step-indicator/index.module.css';

const DiaryPageStepIndicator = (props: {
	current: number;
	total: number;
	title: string;
	description: string;
}) => {
	const { current, total, title, description } = props;

	return (
		<div className={style.container}>
			<div>
				{Array.from({ length: total }, (_, index) => (
					<div key={index} className={index + 1 === current ? style.current : style.default} />
				))}
			</div>
			<span className={style.title}>{title}</span>
			<span className={style.description}>{description}</span>
		</div>
	);
};

export default DiaryPageStepIndicator;
