import { IContractData } from '../interfaces/IContractData';
import { AnimatePresence, motion } from 'framer-motion';
import { useNuiEvent } from '../hooks/useNuiEvent';
import { Contract } from './Contract/Contract';
import { isEnvBrowser } from '../utils/misc';
import { fetchNui } from '../utils/fetchNui';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledContainer = styled.div.attrs({
	className: 'tgg-container',
})`
	position: absolute;
	width: 100%;
	height: 100%;
`;

export const Container = () => {
	const [contractVisible, setContractVisible] = useState(false);

	const [contractData, setContractData] = useState<IContractData>();

	useNuiEvent('ui:start-contract', (_contractData) => {
		setContractData(_contractData);
		setContractVisible(true);
	});

	useNuiEvent('ui:hide-contract', () =>
		setContractVisible(false),
	);

	useEffect(() => {
		// Only attach listener when we are visible
		if (!contractVisible) return;

		const keyHandler = (e: KeyboardEvent) => {
			if (['Escape'].includes(e.code)) {
				if (!isEnvBrowser()) {
					e.preventDefault();

					fetchNui('close');
				}
			}
		};

		window.addEventListener('keyup', keyHandler);

		return () => window.removeEventListener('keyup', keyHandler);
	}, [contractVisible]);

	return (
		<StyledContainer>
			<AnimatePresence>
				{contractVisible && contractData && (
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
