import { VisibilityProvider } from './providers/VisibilityProvider';
import { emitUiEvent } from './utils/emitUiEvent';
import { fetchNui } from './utils/fetchNui';
import { useEffect } from 'react';

// ******************* //
// BROWSER ONLY EVENTS //
// ******************* //
// This will set the NUI to visible if we are developing in browser.
emitUiEvent(
	{
		action: 'ui:show',
	},
	200,
);

// ******************* //
// BROWSER ONLY EVENTS //
// ******************* //

const App = () => {
	useEffect(() => {
		fetchNui('nui:ready', null, true);
	}, []);

	return (
		<VisibilityProvider>
			<h1>Hello!</h1>
		</VisibilityProvider>
	);
};

export default App;
