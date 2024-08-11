import { IAgreementDetails } from '../interfaces/IAgreementDetails';
import { IContractData } from '../interfaces/IContractData';
import { AnimatePresence, motion } from 'framer-motion';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { Contract } from './Contract/Contract';
import { useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div.attrs({
	className: 'tgg-container',
})`
	position: absolute;
	width: 100%;
	height: 100%;
`;

export const Container = () => {
	const [sheetVisible, setSheetVisible] = useState(false);

	const [contractData, setContractData] = useState<IContractData>();

	useNuiEvent('ui:toggle-contract', (visible: boolean) =>
		setSheetVisible(visible),
	);

	useNuiEvent('ui:start-contract', (_contractData) => {
		setContractData(_contractData);
		setSheetVisible(true);
	});

	useNuiEvent('ui:hide-contract', () =>
		setSheetVisible(false),
	);

	useNuiEvent('ui:submit-sale-agreement', (data: IAgreementDetails) => {
		setSheetVisible(true);
	});

	return (
		<StyledContainer>
			<AnimatePresence>
				{sheetVisible && contractData && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						<Contract contractData={contractData} />
					</motion.div>
				)}
			</AnimatePresence>
		</StyledContainer>
	);
};
