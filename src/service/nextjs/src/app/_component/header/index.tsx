import { ReactNode } from 'react';
import style from '../../_style/component/header/index.module.css';

const Header = (props: { title?: string; component?: ReactNode; divider?: boolean }) => {
	const { title, component, divider } = props;

	return (
		<div className={style.container}>
			<div className={divider ? style.divider : ''}>
				<div>
					<span className={style.title}>{title}</span>
				</div>
				<div>{component}</div>
			</div>
		</div>
	);
};

export default Header;
