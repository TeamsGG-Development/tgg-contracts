import { IContractData } from './interfaces/IContractData';
import { Container } from './components/Container';
import { emitUiEvent } from './utils/emitUiEvent';
import { fetchNui } from './utils/fetchNui';
import { useEffect } from 'react';

// ******************* //
// BROWSER ONLY EVENTS //
// ******************* //

const dummyContractData: IContractData = {
	isSeller: true,
	buyerName: 'John Doe',
	sellerName: 'Jane Doe',
	vehicleModel: '2021 Tesla Model S',
	vehiclePlate: 'ABC123',
	description: 'This is a dummy contract.',
	dealPrice: 100000,
};

// This will set the NUI to visible if we are developing in browser.
emitUiEvent(
	{
		action: 'ui:start-contract',
		data: dummyContractData,
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

	return <Container />;
};

export default App;
