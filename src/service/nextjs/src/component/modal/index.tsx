import { Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react';
import { createPortal } from 'react-dom';
import { Close } from '@mui/icons-material';
import style from '@/style/component/modal/index.module.css';

const Modal = (props: {
	children: ReactNode;
	isOpened: boolean;
	setIsOpened: Dispatch<SetStateAction<boolean>>;
}) => {
	const { children, isOpened, setIsOpened } = props;

	return (
		isOpened &&
		createPortal(
			<div
				className={style.container}
				onClick={(event: MouseEvent<HTMLDivElement>) => {
					event.preventDefault();
					event.stopPropagation();
					setIsOpened(false);
				}}
			>
				<div className={style.inner}>
					<div>
						<Close
							onClick={(event: MouseEvent<SVGSVGElement>) => {
								event.preventDefault();
								event.stopPropagation();
								setIsOpened(false);
							}}
						/>
					</div>
					<div
						onClick={(event: MouseEvent<HTMLDivElement>) => {
							event.preventDefault();
							event.stopPropagation();
						}}
					>
						{children}
					</div>
				</div>
			</div>,
			document.body,
		)
	);
};

export default Modal;
