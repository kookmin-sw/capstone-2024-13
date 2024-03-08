import { ReactNode } from 'react';
import { AuthProvider } from './auth';

const ContextProviders = (props: { children: ReactNode }) => {
	const { children } = props;

	return <AuthProvider>{children}</AuthProvider>;
};

export default ContextProviders;
