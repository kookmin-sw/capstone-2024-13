import { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { DiaryProvider } from './diary';

const ContextProviders = (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<AuthProvider>
			<DiaryProvider>{children}</DiaryProvider>
		</AuthProvider>
	);
};

export default ContextProviders;
