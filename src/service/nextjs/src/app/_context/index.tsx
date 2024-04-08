import { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { AlbumProvider } from './album';

const ContextProviders = (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<AuthProvider>
			<AlbumProvider>{children}</AlbumProvider>
		</AuthProvider>
	);
};

export default ContextProviders;
