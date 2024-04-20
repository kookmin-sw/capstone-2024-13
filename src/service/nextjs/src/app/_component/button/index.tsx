import { ButtonProps, Button as MuiButton } from '@mui/material';

const Button = (props: ButtonProps) => {
	const { children, onClick, ...rest } = props;

	return (
		<MuiButton
			onClick={event => {
				event.preventDefault();
				event.stopPropagation();
				onClick && onClick(event);
			}}
			{...rest}
		>
			{children}
		</MuiButton>
	);
};

export default Button;
