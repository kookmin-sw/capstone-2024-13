import { ReactNode } from 'react';
import { AuthProvider } from './auth';
import { AlbumProvider } from './album';
import { TabBarVisibilityProvider } from './tab-bar-visibility';
import { HeaderProvider } from './header';

const ContextProviders = (props: { children: ReactNode }) => {
	const { children } = props;

	return (
		<AuthProvider>
			<AlbumProvider>
				<HeaderProvider>
					<TabBarVisibilityProvider>{children}</TabBarVisibilityProvider>
				</HeaderProvider>
			</AlbumProvider>
		</AuthProvider>
	);
};

export default ContextProviders;
