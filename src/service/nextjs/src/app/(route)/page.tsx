import Header from '../_component/header';
import style from '../_style/(route)/index.module.css';

export default function Home() {
	return (
		<div className={style.container}>
			<Header title="일기 앨범" />
			<div></div>
		</div>
	);
}
