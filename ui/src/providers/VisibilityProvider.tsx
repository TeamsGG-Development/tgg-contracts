import { emitUiEvent } from '../utils/emitUiEvent';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { isEnvBrowser } from '../utils/misc';
import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	Context,
	useMemo,
} from 'react';

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
	setVisible: (visible: boolean) => void;
	visible: boolean;
}

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [visible, setVisible] = useState(false);

	useNuiEvent('ui:toggle', (visible: boolean) => setVisible(visible));

	useNuiEvent('ui:show', () => setVisible(true));

	useNuiEvent('ui:hide', () => setVisible(false));

	// Handle pressing escape/backspace
	useEffect(() => {
		// Only attach listener when we are visible
		if (!visible) return;

		const keyHandler = (e: KeyboardEvent) => {
			if (
				['Backquote'].includes(e.code) &&
				isEnvBrowser() &&
				window.location.host.includes('localhost')
			) {
				emitUiEvent([{ action: 'ui:toggle-dev-menu', data: true }], 0);
			}
		};

		window.addEventListener('keyup', keyHandler);

		return () => window.removeEventListener('keyup', keyHandler);
	}, [visible]);

	const cleanupOnClose = () => {
		// Чистачка моля
	};

	// Memoize the context value so it only changes when `visible` or `setVisible` changes.
	const contextValue = useMemo(
		() => ({ visible, setVisible }),
		[visible, setVisible],
	);

	return (
		<VisibilityCtx.Provider value={contextValue}>
			<div
				style={{
					visibility: visible ? 'visible' : 'hidden',
					height: '100%',
				}}>
				{children}
			</div>
		</VisibilityCtx.Provider>
	);
};

export const useVisibility = () =>
	useContext<VisibilityProviderValue>(
		VisibilityCtx as Context<VisibilityProviderValue>,
	);
