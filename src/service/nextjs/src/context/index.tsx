import { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { AlbumProvider } from './album';
import { TabBarVisibilityProvider } from './tab-bar-visibility';

const ContextProviders = (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<AuthProvider>
			<AlbumProvider>
				<TabBarVisibilityProvider>{children}</TabBarVisibilityProvider>
			</AlbumProvider>
		</AuthProvider>
	);
};

export default ContextProviders;
